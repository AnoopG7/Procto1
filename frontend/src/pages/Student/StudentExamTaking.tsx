import React, { useRef, useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Stack,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
} from "@mui/material";

type SwitchClip = {
  webcamBlob: Blob;
  screenBlob: Blob;
  start: number;
  end: number;
  type: string;
};

const questions = [
  {
    label: "1. Describe your approach to problem-solving:",
    type: "textarea",
    name: "q1",
  },
  {
    label: "2. What motivates you during exams?",
    type: "textarea",
    name: "q2",
  },
  {
    label: "3. How do you manage stress?",
    type: "textarea",
    name: "q3",
  },
  {
    label: "4. Give an example of a challenge you overcame:",
    type: "textarea",
    name: "q4",
  },
  {
    label: "5. Which of the following is a programming language?",
    type: "radio",
    name: "q5",
    options: ["Python", "Elephant", "Banana", "Car"],
  },
  {
    label: "6. HTML stands for:",
    type: "radio",
    name: "q6",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperText Markdown Language",
      "None of these",
    ],
  },
  {
    label: "7. CSS is used for:",
    type: "radio",
    name: "q7",
    options: [
      "Styling web pages",
      "Database management",
      "Networking",
      "Operating systems",
    ],
  },
  {
    label: "8. JavaScript can be used to:",
    type: "radio",
    name: "q8",
    options: [
      "Make web pages interactive",
      "Wash dishes",
      "Cook food",
      "None of these",
    ],
  },
  {
    label: "9. Which tag is used to display images in HTML?",
    type: "radio",
    name: "q9",
    options: ["img", "image", "src", "pic"],
  },
  {
    label: "10. Which one is a front-end framework?",
    type: "radio",
    name: "q10",
    options: ["React", "Node.js", "MongoDB", "Express"],
  },
];

export function StudentExamTaking() {
  // --- State ---
  const [step, setStep] = useState<"preview" | "exam" | "results">("preview");
  const [permissionError, setPermissionError] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 min
  const [countdownActive, setCountdownActive] = useState(false);
  const [switchClips, setSwitchClips] = useState<SwitchClip[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  // --- Refs for media streams and recorders ---
  const webcamStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const webcamPreviewRef = useRef<HTMLVideoElement>(null);
  const screenPreviewRef = useRef<HTMLVideoElement>(null);

  // Recording state
  const webcamRecorderRef = useRef<MediaRecorder | null>(null);
  const screenRecorderRef = useRef<MediaRecorder | null>(null);
  const webcamChunksRef = useRef<Blob[]>([]);
  const screenChunksRef = useRef<Blob[]>([]);
  const isRecordingSwitchRef = useRef(false);
  const switchStartTimeRef = useRef<number>(0);
  const lastSwitchTypeRef = useRef<string | null>(null);

  // --- Permissions & Preview ---
  useEffect(() => {
    if (step === "preview") {
      (async () => {
        setPermissionError("");
        try {
          const webcamStream = await navigator.mediaDevices.getUserMedia({
            video: { width: 320, height: 240, frameRate: { ideal: 10, max: 15 } },
            audio: false,
          });
          webcamStreamRef.current = webcamStream;
          if (webcamPreviewRef.current) {
            webcamPreviewRef.current.srcObject = webcamStream;
          }
        } catch {
          setPermissionError("Webcam permission denied.");
        }
        try {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: { width: 640, height: 360, frameRate: { ideal: 10, max: 15 } },
            audio: false,
          });
          screenStreamRef.current = screenStream;
          if (screenPreviewRef.current) {
            screenPreviewRef.current.srcObject = screenStream;
          }
        } catch {
          setPermissionError("Screen permission denied.");
        }
      })();
    }
    // Cleanup streams on unmount
    return () => {
      webcamStreamRef.current?.getTracks().forEach((t) => t.stop());
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [step]);

  // --- Countdown ---
  useEffect(() => {
    if (!countdownActive) return;
    if (timeLeft <= 0) {
      setCountdownActive(false);
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [countdownActive, timeLeft]);

  // --- Tab/Window Switch Monitoring ---
  useEffect(() => {
    if (step !== "exam") return;

    // Use both visibilitychange and blur/focus
    const handleVisibility = () => {
      if (document.hidden) {
        lastSwitchTypeRef.current = "tab";
        startSwitchRecording("tab");
      } else {
        stopSwitchRecording();
      }
    };
    const handleBlur = () => {
      if (!isRecordingSwitchRef.current) {
        lastSwitchTypeRef.current = "window";
        startSwitchRecording("window");
      }
    };
    const handleFocus = () => stopSwitchRecording();

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [step]);

  // --- Recording Functions ---
  function startSwitchRecording(type: string) {
    if (isRecordingSwitchRef.current) return;
    isRecordingSwitchRef.current = true;
    webcamChunksRef.current = [];
    screenChunksRef.current = [];
    switchStartTimeRef.current = Date.now();

    const webcamStream = webcamStreamRef.current;
    const screenStream = screenStreamRef.current;
    if (!webcamStream || !screenStream) return;

    let webcamRecorder: MediaRecorder;
    let screenRecorder: MediaRecorder;

    try {
      webcamRecorder = new MediaRecorder(webcamStream, {
        mimeType: "video/webm;codecs=vp8",
        videoBitsPerSecond: 100 * 1000,
      });
    } catch (err) {
      setPermissionError("Webcam recording failed to start.");
      return;
    }
    try {
      screenRecorder = new MediaRecorder(screenStream, {
        mimeType: "video/webm;codecs=vp8",
        videoBitsPerSecond: 200 * 1000,
      });
    } catch (err) {
      setPermissionError("Screen recording failed to start.");
      return;
    }

    webcamRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) webcamChunksRef.current.push(e.data);
    };
    screenRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) screenChunksRef.current.push(e.data);
    };

    webcamRecorder.onerror = (e) => {
      setPermissionError("Webcam recording error: " + e.error?.name);
    };
    screenRecorder.onerror = (e) => {
      setPermissionError("Screen recording error: " + e.error?.name);
    };

    webcamRecorder.onstop = () => {
      const webcamBlob = new Blob(webcamChunksRef.current, { type: "video/webm" });
      const screenBlob = new Blob(screenChunksRef.current, { type: "video/webm" });
      setSwitchClips((prev) => [
        ...prev,
        {
          webcamBlob,
          screenBlob,
          start: switchStartTimeRef.current,
          end: Date.now(),
          type: type || lastSwitchTypeRef.current || "unknown",
        },
      ]);
    };

    webcamRecorder.start();
    screenRecorder.start();

    webcamRecorderRef.current = webcamRecorder;
    screenRecorderRef.current = screenRecorder;
  }

  function stopSwitchRecording() {
    if (!isRecordingSwitchRef.current) return;
    isRecordingSwitchRef.current = false;
    if (webcamRecorderRef.current && webcamRecorderRef.current.state !== "inactive")
      webcamRecorderRef.current.stop();
    if (screenRecorderRef.current && screenRecorderRef.current.state !== "inactive")
      screenRecorderRef.current.stop();
  }

  // --- Exam Start ---
  function handleStartExam() {
    if (!webcamStreamRef.current || !screenStreamRef.current) {
      setPermissionError("Please allow webcam and screen permissions.");
      return;
    }
    setStep("exam");
    setCountdownActive(true);
  }

  // --- Exam Submission ---
  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setCountdownActive(false);
    stopSwitchRecording();
    webcamStreamRef.current?.getTracks().forEach((t) => t.stop());
    screenStreamRef.current?.getTracks().forEach((t) => t.stop());
    setStep("results");
  }

  // --- Results ---
  function renderResults() {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
              Exam Proctoring Results
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Tab/Window Switch Recordings:
            </Typography>
            <Stack spacing={2} sx={{ mb: 4 }}>
              {switchClips.length === 0 ? (
                <Typography color="text.secondary">
                  No tab/window switch events detected. Good job staying focused!
                </Typography>
              ) : (
                switchClips.map((clip, i) => {
                  const webcamUrl = URL.createObjectURL(clip.webcamBlob);
                  const screenUrl = URL.createObjectURL(clip.screenBlob);
                  const duration = Math.round((clip.end - clip.start) / 1000);
                  const timeString = new Date(clip.start).toLocaleTimeString();
                  return (
                    <Card key={i} variant="outlined">
                      <CardContent>
                        <Typography fontWeight={600}>
                          Switch #{i + 1}{" "}
                          <span style={{ color: "#888", fontSize: 12 }}>
                            ({clip.type === "tab" ? "Tab Switch" : "Window Switch"}, {timeString}, {duration}s)
                          </span>
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          <Grid item xs={6}>
                            <Typography fontWeight={500} fontSize={14}>
                              Face:
                            </Typography>
                            <video
                              controls
                              style={{ width: "100%", maxHeight: 120, background: "#000", borderRadius: 8 }}
                              preload="metadata"
                            >
                              <source src={webcamUrl} type="video/webm" />
                              Your browser does not support the video tag.
                            </video>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography fontWeight={500} fontSize={14}>
                              Screen:
                            </Typography>
                            <video
                              controls
                              style={{ width: "100%", maxHeight: 120, background: "#000", borderRadius: 8 }}
                              preload="metadata"
                            >
                              <source src={screenUrl} type="video/webm" />
                              Your browser does not support the video tag.
                            </video>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </Stack>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Your Answers:
            </Typography>
            <Stack spacing={2}>
              {questions.map((q) => (
                <div key={q.name}>
                  <Typography fontWeight={600}>{q.label}</Typography>
                  <Typography color="text.secondary">{answers[q.name]}</Typography>
                </div>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  }

  // --- Exam Form ---
  function renderExamForm() {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
              Exam
            </Typography>
            <Typography align="center" color="text.secondary" sx={{ mb: 2 }}>
              Time Left:{" "}
              <span style={{ fontWeight: 600 }}>
                {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                {String(timeLeft % 60).padStart(2, "0")}
              </span>
            </Typography>
            <form
              onSubmit={(e) => {
                setShowDialog(true);
                e.preventDefault();
              }}
            >
              <Stack spacing={3}>
                {questions.map((q) =>
                  q.type === "textarea" ? (
                    <TextField
                      key={q.name}
                      label={q.label}
                      name={q.name}
                      required
                      multiline
                      minRows={2}
                      value={answers[q.name] || ""}
                      onChange={(e) =>
                        setAnswers((prev) => ({ ...prev, [q.name]: e.target.value }))
                      }
                    />
                  ) : (
                    <div key={q.name}>
                      <Typography fontWeight={600} sx={{ mb: 1 }}>
                        {q.label}
                      </Typography>
                      <RadioGroup
                        name={q.name}
                        value={answers[q.name] || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({ ...prev, [q.name]: e.target.value }))
                        }
                      >
                        {q.options!.map((opt) => (
                          <FormControlLabel
                            key={opt}
                            value={opt}
                            control={<Radio required />}
                            label={opt}
                          />
                        ))}
                      </RadioGroup>
                    </div>
                  )
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ py: 1.5, fontWeight: 600 }}
                  fullWidth
                >
                  Submit
                </Button>
              </Stack>
            </form>
            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
              <DialogTitle>Submit Exam</DialogTitle>
              <DialogContent>
                <Typography>
                  Are you sure you want to submit your exam? Once submitted, you cannot make any changes.
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 2 }}>
                  Time remaining:{" "}
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowDialog(false)}>Continue Exam</Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setShowDialog(false);
                    handleSubmit();
                  }}
                >
                  Submit Exam
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>
      </Container>
    );
  }

  // --- Preview Section ---
  function renderPreview() {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
              Exam Proctoring Preview
            </Typography>
            <Typography color="text.secondary" align="center" sx={{ mb: 2 }}>
              Please grant access to your <b>webcam</b> and <b>screen</b>. You'll see a preview before the exam starts.
            </Typography>
            <Stack spacing={3}>
              <div>
                <Typography fontWeight={600} sx={{ mb: 1 }}>
                  Webcam Preview:
                </Typography>
                <video
                  ref={webcamPreviewRef}
                  autoPlay
                  muted
                  playsInline
                  style={{ width: "100%", background: "#000", borderRadius: 8 }}
                />
              </div>
              <div>
                <Typography fontWeight={600} sx={{ mb: 1 }}>
                  Screen Preview:
                </Typography>
                <video
                  ref={screenPreviewRef}
                  autoPlay
                  muted
                  playsInline
                  style={{ width: "100%", background: "#000", borderRadius: 8 }}
                />
              </div>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
              fullWidth
              onClick={handleStartExam}
            >
              Start Exam
            </Button>
            {permissionError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {permissionError}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Container>
    );
  }

  // --- Render ---
  if (step === "preview") return renderPreview();
  if (step === "exam") return renderExamForm();
  return renderResults();
}