"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const featuredProduct = { brand: "Tâm Việt Quang", name: "Signature piece", type: "Jacket" };

const products = [
  { name: "Jacket", detail: "Outerwear", type: "Jacket", icon: "J-01", img: "/Demo/Jacket.jpg" },
  { name: "T-Shirt", detail: "Essentials", type: "T-Shirt", icon: "TS-03", img: "/Demo/T-Shirt.jpg" },
  { name: "Bag", detail: "Accessories", type: "Bag", icon: "B-04", img: "/Demo/Bag.jpg" },
  { name: "Sneakers", detail: "Footwear", type: "Sneakers", icon: "S-02", img: "/Demo/Sneakers.jpg" },
  { name: "Cap", detail: "Accessories", type: "Cap", icon: "C-05", img: "/Demo/Cap.jpg" },
  { name: "Necklace", detail: "Jewelry", type: "Necklace", icon: "N-06", img: "/Demo/Necklace.jpg" },
];

const concepts = [
  { name: "Tokyo Night", color: "tokyo", descriptor: "Neon · cinematic", bg: "/products/tokyo.jpg" },
  { name: "Urban Street", color: "urban", descriptor: "Raw · expressive", bg: "/products/urban.jpg" },
  { name: "Quiet Luxury", color: "luxury", descriptor: "Soft · elevated", bg: "/products/luxury.jpg" },
  { name: "Summer Escape", color: "summer", descriptor: "Sunlit · free", bg: "/products/summer.jpg" },
];

const journey = [
  { title: "Analyzing you", short: "YOU", cue: "Reading your pose & light" },
  { title: "Product detected", short: "PRODUCTS", cue: "Connecting your selection" },
  { title: "Building your world", short: "WORLD", cue: "Your concept takes shape" },
  { title: "Styling your look", short: "LOOK", cue: "Bringing it all together" },
  { title: "Creating campaign", short: "CAMPAIGN", cue: "Designing your collection" },
  { title: "Ready to reveal", short: "READY", cue: "Your campaign is waiting" },
];

type ViewState = "setup" | "capture" | "campaign" | "feed";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function Sparkle({ className = "", reversed = false }: { className?: string; reversed?: boolean }) {
  return (
    <span className={`sparkle ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" fill="none" focusable="false">
        <path d="M50 4 L58 42 L96 50 L58 58 L50 96 L42 58 L4 50 L42 42 Z" fill={reversed ? "#EFEBE3" : "#101012"} />
        <path d="M50 22 L54 46 L78 50 L54 54 L50 78 L46 54 L22 50 L46 46 Z" fill={reversed ? "#A8BFC9" : "#2036F5"} />
      </svg>
    </span>
  );
}

function CampaignArtwork({
  concept,
  photo,
  compact = false,
  useSystemImage = false,
  processedResult,
  imageAlt = "Virtual try-on result",
}: {
  concept: string;
  photo?: string;
  compact?: boolean;
  useSystemImage?: boolean;
  processedResult?: string;
  imageAlt?: string;
}) {
  const conceptData = concepts.find((item) => item.name === concept);
  const palette = conceptData?.color ?? "tokyo";
  const bgImage = conceptData?.bg ?? "/products/tokyo.jpg";

  // Priority: Processed result > System image > captured photo > CSS illustration
  const displayImage = processedResult || (useSystemImage ? bgImage : photo);

  return (
    <div
      className={`campaign-art art-${palette}${compact ? " art-compact" : ""}${displayImage ? " has-photo" : ""}`}
      aria-label={`${concept} fashion campaign artwork`}
      role="img"
    >
      <div className="art-grain" />
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <div className="art-copy">
        <span>VYIQ × NS PRESENTS</span>
        <strong>{concept === "Tokyo Night" ? "TOKYO\nAFTER DARK" : concept.toUpperCase()}</strong>
        <i>THE NEW PERSPECTIVE · 2026</i>
      </div>
      <div className={`art-figure${displayImage ? " has-photo" : ""}`}>
        {displayImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={displayImage}
            alt={imageAlt}
          />
        ) : (
          <>
            <div className="figure-halo" />
            <div className="figure-head" />
            <div className="figure-neck" />
            <div className="figure-body" />
          </>
        )}
      </div>
      <div className="art-side-note">A LOOK THAT<br />MOVES YOU.</div>
      <div className="art-index">01 <span>/</span> 06</div>
      <Sparkle className="art-sparkle" reversed />
    </div>
  );
}

function TopBar({
  active,
  onNavigate,
}: {
  active: ViewState;
  onNavigate: (view: ViewState) => void;
}) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="VyIQ home">
        <span className="brand-mark"><Sparkle /></span>
        <span>VYIQ × NORD STORIA<span className="brand-light"> AI STUDIO</span></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <button className={active !== "feed" ? "nav-active" : ""} onClick={() => onNavigate("setup")}>The studio</button>
        <button className={active === "campaign" ? "nav-active" : ""} onClick={() => onNavigate("campaign")}>Campaign</button>
        <button className={active === "feed" ? "nav-active" : ""} onClick={() => onNavigate("feed")}>Audience</button>
        <a className="nav-link" href="/studio/dashboard">Dashboard</a>
      </nav>
      <div className="session-label"><span className="online-dot" /> STUDIO SESSION <span className="session-number">№ 0248</span></div>
    </header>
  );
}

export default function Home() {
  const [view, setView] = useState<ViewState>("setup");
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["Jacket", "Bag"]);
  const [selectedConcept, setSelectedConcept] = useState("Tokyo Night");
  const [productDescription, setProductDescription] = useState("");
  const [generatedProduct, setGeneratedProduct] = useState<string>();
  const [generatingProduct, setGeneratingProduct] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);
  const [photo, setPhoto] = useState<string>();
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [theatreMode, setTheatreMode] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(128);
  const [commentSent, setCommentSent] = useState(false);
  const [processedResult, setProcessedResult] = useState<string>();
  const [shooting, setShooting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [pendingFrame, setPendingFrame] = useState<string>();
  const [pendingMirror, setPendingMirror] = useState(false);
  const [pendingBrightness, setPendingBrightness] = useState(1);
  const [confirming, setConfirming] = useState(false);
  const [tryOnStatus, setTryOnStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [campaignImage, setCampaignImage] = useState<string>();
  const [campaignCaption, setCampaignCaption] = useState<string>();
  const [generatingCampaign, setGeneratingCampaign] = useState(false);
  const [contact, setContact] = useState("");
  const [sendingContact, setSendingContact] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactError, setContactError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const shotIndexRef = useRef(0);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOn(false);
  }, []);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  useEffect(() => {
    if (cameraOn && videoRef.current && streamRef.current) {
      const video = videoRef.current;
      if (video.srcObject !== streamRef.current) {
        video.srcObject = streamRef.current;
      }
      void video.play().catch(() => {});
    }
  }, [cameraOn, shooting, confirming, photoCount]);

  useEffect(() => {
    if (view !== "feed") return;
    const timer = window.setInterval(() => {
      setLikes((current) => current + 1 + Math.floor(Math.random() * 3));
    }, 4200);
    return () => window.clearInterval(timer);
  }, [view]);

  const stageIndex = view === "setup" ? -1 : view === "campaign" || view === "feed" ? 5 : Math.min(photoCount - 1, 5);
  const currentJourney = journey[Math.max(0, stageIndex)];
  const canStart = selectedProducts.length > 0 && selectedConcept.length > 0 && productDescription.trim().length > 0;
  const activeProductType = products.find((product) => product.name === selectedProducts[0])?.type ?? featuredProduct.type;

  function toggleProduct(name: string) {
    setSelectedProducts((current) => {
      if (current.includes(name)) return current.filter((item) => item !== name);
      if (current.length >= 3) return current;
      return [...current, name];
    });
  }

  async function startCamera(): Promise<boolean> {
    setCameraError("");
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera access is not available here. Please allow camera access to start the photoshoot.");
      return false;
    }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      setCameraOn(true);
      return true;
    } catch {
      setCameraError("Camera permission was unavailable. Please allow camera access to start the photoshoot.");
      return false;
    }
  }

  function captureFrame(): string | null {
    if (cameraOn && videoRef.current) {
      const video = videoRef.current;
      if (!video.videoWidth || !video.videoHeight) return null;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg", 0.86);
      }
    }
    return null;
  }

  function takeShot() {
    const index = shotIndexRef.current;
    const frame = captureFrame();
    if (!frame) {
      setCameraError("Couldn't grab that frame — the camera isn't ready yet. Try again.");
      setShooting(false);
      setCountdown(null);
      return;
    }
    if (index === 0) {
      // Frame 1: pause for user review before anything goes to the AI.
      setPendingFrame(frame);
      setPendingMirror(false);
      setPendingBrightness(1);
      setConfirming(true);
      setShooting(false);
      setCountdown(null);
      return;
    }
    setPhotoCount(index + 1);
    shotIndexRef.current = index + 1;
    if (index + 1 >= 5) {
      setShooting(false);
      setCountdown(null);
    } else {
      setCountdown(10);
    }
  }

  function confirmFirstFrame() {
    if (!pendingFrame) return;
    const frame = pendingFrame;
    const mirror = pendingMirror;
    const brightness = pendingBrightness;
    setPendingFrame(undefined);
    setConfirming(false);
    if (!mirror && brightness === 1) {
      setPhoto(frame);
      setPhotoCount(1);
      shotIndexRef.current = 1;
      void runTryOn(frame);
      setShooting(true);
      setCountdown(10);
      return;
    }
    const source = new Image();
    source.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = source.naturalWidth;
      canvas.height = source.naturalHeight;
      const context = canvas.getContext("2d");
      let finalFrame = frame;
      if (context) {
        context.filter = `brightness(${brightness})`;
        if (mirror) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        context.drawImage(source, 0, 0, canvas.width, canvas.height);
        finalFrame = canvas.toDataURL("image/jpeg", 0.86);
      }
      setPhoto(finalFrame);
      setPhotoCount(1);
      shotIndexRef.current = 1;
      void runTryOn(finalFrame);
      setShooting(true);
      setCountdown(10);
    };
    source.onerror = () => {
      setPhoto(frame);
      setPhotoCount(1);
      shotIndexRef.current = 1;
      void runTryOn(frame);
      setShooting(true);
      setCountdown(10);
    };
    source.src = frame;
  }

  function retakeFirstFrame() {
    setPendingFrame(undefined);
    setConfirming(false);
    setShooting(true);
    setCountdown(10);
  }

  useEffect(() => {
    if (!shooting || countdown === null) return;
    if (countdown > 0) {
      const timer = window.setTimeout(() => setCountdown((current) => (current ?? 1) - 1), 1000);
      return () => window.clearTimeout(timer);
    }
    takeShot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shooting, countdown]);

  async function startPhotoshoot() {
    setCameraError("");
    if (!cameraOn) {
      const started = await startCamera();
      if (!started) return;
    }
    shotIndexRef.current = 0;
    setPhotoCount(0);
    setPhoto(undefined);
    setPendingFrame(undefined);
    setConfirming(false);
    setProcessedResult(undefined);
    setTryOnStatus("idle");
    setCampaignImage(undefined);
    setCampaignCaption(undefined);
    setShooting(true);
    setCountdown(10);
  }

  function resetCapture() {
    stopCamera();
    setPhotoCount(0);
    setPhoto(undefined);
    setPendingFrame(undefined);
    setConfirming(false);
    setCameraError("");
    setProcessedResult(undefined);
    setShooting(false);
    setCountdown(null);
    setTryOnStatus("idle");
    setCampaignImage(undefined);
    setCampaignCaption(undefined);
    shotIndexRef.current = 0;
  }

  async function runTryOn(personDataUrl: string) {
    setTryOnStatus("processing");
    setCameraError("");

    try {
      const response = await fetch(personDataUrl);
      const personBlob = await response.blob();
      const personFile = new File([personBlob], "person.jpg", { type: "image/jpeg" });

      if (!generatedProduct) {
        throw new Error("Generated product is missing");
      }

      const productImageResponse = await fetch(generatedProduct);
      const productBlob = await productImageResponse.blob();
      const productFile = new File([productBlob], "product.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("person", personFile);
      formData.append("clothing", productFile);

      const apiResponse = await fetch("/api/try-on", {
        method: "POST",
        body: formData,
      });

      const data = await apiResponse.json();

      if (data.success && data.result) {
        setProcessedResult(data.result);
        setTryOnStatus("done");
        // New try-on result invalidates the previous campaign so it regenerates.
        setCampaignImage(undefined);
        setCampaignCaption(undefined);
      } else {
        throw new Error(data.error || "Try-on failed");
      }
    } catch (error) {
      console.error("Try-on error:", error);
      setTryOnStatus("error");
      setCameraError(error instanceof Error ? error.message : "Try-on failed");
    }
  }

  async function generateProductAndStart() {
    if (!productDescription.trim() || selectedProducts.length === 0) return;
    setGeneratingProduct(true);
    setCameraError("");

    try {
      const formData = new FormData();
      formData.append("productType", activeProductType);
      formData.append("description", productDescription.trim());
      formData.append("scene", selectedConcept);

      const response = await fetch("/api/generate-product", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.result) {
        setGeneratedProduct(data.result);
        // Stay on setup so the user can review the product first.
        // They enter the studio via the "Enter studio" button.
      } else {
        throw new Error(data.error || "Product generation failed");
      }
    } catch (error) {
      console.error("Product generation error:", error);
      setCameraError(error instanceof Error ? error.message : "Product generation failed");
    } finally {
      setGeneratingProduct(false);
    }
  }

  async function generateCampaign() {
    if (!processedResult) return;
    setGeneratingCampaign(true);
    setCameraError("");

    try {
      const imageResponse = await fetch(processedResult);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], "campaign.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("concept", selectedConcept);
      formData.append("product", activeProductType);

      const apiResponse = await fetch("/api/generate-campaign", {
        method: "POST",
        body: formData,
      });

      const data = await apiResponse.json();

      if (data.success && data.result) {
        setCampaignImage(data.result);
        setCampaignCaption(data.caption ?? "");
      } else {
        throw new Error(data.error || "Campaign generation failed");
      }
    } catch (error) {
      console.error("Campaign generation error:", error);
      setCameraError(error instanceof Error ? error.message : "Campaign generation failed");
    } finally {
      setGeneratingCampaign(false);
    }
  }

  useEffect(() => {
    // Campaign generation starts in the background as soon as the try-on
    // result lands — no need to wait for the reveal step.
    if (processedResult && !campaignImage && !generatingCampaign) {
      void generateCampaign();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, processedResult]);

  async function sendImages() {
    const value = contact.trim();
    if (!value) return;
    setSendingContact(true);
    setContactError("");

    try {
      const response = await fetch("/api/deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: value,
          productUrl: generatedProduct ?? null,
          tryOnUrl: processedResult ?? null,
          campaignUrl: campaignImage ?? null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setContactSent(true);
      } else {
        throw new Error(data.error || "Delivery failed");
      }
    } catch (error) {
      console.error("Delivery error:", error);
      setContactError(error instanceof Error ? error.message : "Delivery failed");
    } finally {
      setSendingContact(false);
    }
  }

  function goToCampaign() {
    stopCamera();
    setView("campaign");
  }

  function publishCampaign() {
    setView("feed");
  }

  function toggleLike() {
    setLiked(!liked);
    setLikes((current) => current + (liked ? -1 : 1));
  }

  function navigateToView(nextView: ViewState) {
    if (view === "capture" && nextView !== "capture") stopCamera();
    setView(nextView);
  }

  const activeStageStyle = { "--stage-progress": `${Math.max(0, stageIndex + 1) / 6 * 100}%` } as CSSProperties;

  return (
    <main className="app-shell">
      <TopBar active={view} onNavigate={navigateToView} />

      {view === "feed" ? (
        <section className="feed-page">
          <div className="feed-heading">
            <div>
              <div className="eyebrow"><span className="live-pill"><span /> NOW LIVE</span> · YOUR CAMPAIGN IS OUT THERE</div>
              <h1>Meet your <em>audience.</em></h1>
              <p>Your campaign is live. Watch the story travel.</p>
            </div>
            <button className="button button-outline" onClick={() => setView("campaign")}>← Back to campaign</button>
          </div>
          <div className="feed-layout">
            <article className="social-card">
              <div className="post-header">
                <div className="avatar-mark"><Sparkle /></div>
                <div><strong>Kiyoshi Studio</strong><span>Tokyo, Japan · Just now <span className="public-globe">◎</span></span></div>
                <button className="more-button" aria-label="More post options">···</button>
              </div>
              <CampaignArtwork concept={selectedConcept} photo={photo} processedResult={campaignImage || processedResult} />
              <div className="post-actions">
                <div className="action-buttons">
                  <button onClick={toggleLike} aria-label={liked ? "Unlike campaign" : "Like campaign"} className={liked ? "liked" : ""}>{liked ? "♥" : "♡"}</button>
                  <button aria-label="Comment on campaign" onClick={() => setCommentSent(true)}>◯</button>
                  <button aria-label="Share campaign" onClick={() => setCommentSent(true)}>↗</button>
                </div>
                <button className="save-button" aria-label="Save campaign">♧</button>
              </div>
              <div className="post-copy">
                <strong>{likes.toLocaleString()} likes</strong>
                {campaignCaption ? (
                  <>
                    <p><b>Kiyoshi Studio</b> {campaignCaption.split("\n")[0]}</p>
                    <p className="hashtags">{campaignCaption.split("\n").slice(1).join(" ") || `#${selectedConcept.replaceAll(" ", "")} #NewCollection #MadeWithKiyoshi`}</p>
                  </>
                ) : (
                  <>
                    <p><b>Kiyoshi Studio</b> A new point of view. {selectedConcept === "Tokyo Night" ? "Tokyo after dark, made yours." : `${selectedConcept}, made yours.`}</p>
                    <p className="hashtags">#{selectedConcept.replaceAll(" ", "")} #NewCollection #MadeWithKiyoshi</p>
                  </>
                )}
                <button className="view-comments" onClick={() => setCommentSent(true)}>View all 8 comments</button>
                <div className="comment-row"><div className="tiny-avatar">M</div><p><b>mika.t</b> Where can I get the {activeProductType.toLowerCase()}?</p></div>
                <div className="brand-reply"><span className="reply-line" /><div><span className="reply-label"><Sparkle /> VYIQ × NS ASSISTANT</span><p>It's part of our {selectedConcept} collection. Come take a closer look.</p><button onClick={() => setView("campaign")}>View product <ArrowIcon /></button></div></div>
                {commentSent && <div className="comment-row new-comment"><div className="tiny-avatar audience-avatar">Y</div><p><b>you</b> This look is everything ✨</p><span className="comment-heart">♥</span></div>}
              </div>
              <div className="post-time">A CAMPAIGN BY VYIQ × NORD STORIA</div>
            </article>
            <aside className="audience-panel">
              <div className="panel-kicker"><span className="pulse-ring" /> LIVE AUDIENCE</div>
              <h2>Your story<br />is <em>moving.</em></h2>
              <div className="engagement-score"><strong>{likes.toLocaleString()}</strong><span>people stopped by</span></div>
              <div className="metric-row"><span>♡ Likes</span><b>{likes.toLocaleString()}</b><i className="metric-up">↗ 12%</i></div>
              <div className="metric-row"><span>◯ Comments</span><b>{commentSent ? "9" : "8"}</b><i className="metric-up">↗ 4%</i></div>
              <div className="metric-row"><span>↗ Shares</span><b>24</b><i className="metric-up">↗ 8%</i></div>
              <div className="audience-note"><Sparkle /><p><b>Your brand assistant is on.</b><br />Every question is a chance to make a connection.</p></div>
              <button className="button button-dark full-width" onClick={() => setView("campaign")}>Explore your collection <ArrowIcon /></button>
            </aside>
          </div>
        </section>
      ) : (
        <section className="studio-page">
          <div className="page-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-mark"><Sparkle /></span> YOUR CREATIVE PLAYGROUND <span className="eyebrow-separator">/</span> 01—06</div>
              <h1>{view === "campaign" ? <>This is <em>your look.</em></> : view === "capture" ? <>Let’s make some <em>magic.</em></> : <>Your next campaign,<br /> <em>imagined.</em></>}</h1>
              <p>{view === "campaign" ? "One image. A whole world of possibility." : view === "capture" ? "Six frames, one unforgettable point of view." : "A little you. A little system magic. A lot of possibility."}</p>
            </div>
            <button className={`tv-button${theatreMode ? " tv-active" : ""}`} onClick={() => setTheatreMode(!theatreMode)}><span className="tv-icon">▣</span><span>TV STAGE</span><i>{theatreMode ? "ON" : "OFF"}</i></button>
          </div>

          <div className="studio-grid">
            <section className="control-panel" aria-label="Campaign controls">
              {view === "setup" && (
                <>
                  <div className="panel-step"><span>01</span> BUILD YOUR LOOK <span className="step-line" /><span className="step-count">01 / 03</span></div>
                  <div className="control-section">
                    <div className="section-heading"><div><h2>VyIQ × Nord Storia AI Studio</h2><p>Brand guidelines — one signature piece by Tâm Việt Quang.</p></div><span className="single-choice">COLLAB</span></div>
                    <div className="brand-guidelines">
                      <div className="brand-lockup">
                        <span className="brand-lockup-mark"><Sparkle /></span>
                        <span className="brand-lockup-word">NORD STORIA<sup>®</sup></span>
                      </div>
                      <div className="brand-swatches" aria-hidden="true">
                        <span style={{ background: "#EFEBE3" }} />
                        <span style={{ background: "#101012" }} />
                        <span style={{ background: "#2036F5" }} />
                        <span style={{ background: "#A8BFC9" }} />
                      </div>
                    </div>
                    <div className="product-grid product-grid-single">
                      <div className="product-card product-selected product-locked" aria-pressed="true">
                        <span className="product-icon product-icon-photo"><img src="/Demo/Jacket.jpg" alt="" loading="lazy" /></span><span className="product-info"><b>{featuredProduct.brand}</b><small>{featuredProduct.name}</small></span><span className="check-mark">✓</span>
                      </div>
                    </div>
                  </div>
                  <div className="control-section">
                    <div className="section-heading"><div><h2>Choose your pieces</h2><p>Pick up to three things you love.</p></div><span className="selection-count">{selectedProducts.length} <i>/ 3</i></span></div>
                    <div className="product-grid">
                      {products.map((product) => {
                        const selected = selectedProducts.includes(product.name);
                        return <button key={product.name} className={`product-card${selected ? " product-selected" : ""}`} onClick={() => toggleProduct(product.name)} aria-pressed={selected} disabled={!selected && selectedProducts.length >= 3}>
                          <span className="product-icon product-icon-photo"><img src={product.img} alt="" loading="lazy" /></span><span className="product-info"><b>{product.name}</b><small>{product.detail}</small></span><span className="check-mark">{selected ? "✓" : "+"}</span>
                        </button>;
                      })}
                    </div>
                  </div>
                  <div className="control-section concept-section">
                    <div className="section-heading"><div><h2>Set the scene</h2><p>Choose a creative direction.</p></div><span className="single-choice">CHOOSE ONE</span></div>
                    <div className="concept-list">
                      {concepts.map((concept, index) => <button key={concept.name} className={`concept-option${selectedConcept === concept.name ? " concept-selected" : ""}`} onClick={() => setSelectedConcept(concept.name)} aria-pressed={selectedConcept === concept.name}>
                        <span className={`concept-swatch swatch-${concept.color}`}><span>{["夜", "01", "Ⅱ", "☼"][index]}</span></span>
                        <span className="concept-copy"><b>{concept.name}</b><small>{concept.descriptor}</small></span><span className="radio-mark">{selectedConcept === concept.name && <i />}</span>
                      </button>)}
                    </div>
                  </div>
                  <div className="control-section desc-section">
                    <div className="section-heading"><div><h2>Describe your product</h2><p>Tell the AI exactly what to create.</p></div><span className="single-choice">REQUIRED</span></div>
                    <textarea
                      className="desc-input"
                      value={productDescription}
                      onChange={(event) => setProductDescription(event.target.value)}
                      placeholder="e.g. An oversized denim jacket with silver hardware, washed indigo finish, relaxed streetwear silhouette…"
                      rows={3}
                      maxLength={500}
                      aria-label="Product description for AI generation"
                    />
                    <div className="desc-meta"><span>{productDescription.length} / 500</span><span className="desc-hint">The AI turns your words into the product shot.</span></div>
                  </div>
                  <div className="panel-footer"><span><Sparkle /> YOUR CREATIVE TEAM IS READY</span><button className="button button-dark" onClick={generateProductAndStart} disabled={!canStart || generatingProduct}>{generatingProduct ? "Generating product…" : generatedProduct ? "Regenerate product" : "Generate product"} <ArrowIcon /></button></div>
                  {generatedProduct && !generatingProduct && (
                    <div className="confirm-panel" role="dialog" aria-label="Review your AI product">
                      <div className="confirm-heading"><span>✓</span> YOUR PRODUCT IS READY <span className="step-line" /><span className="step-count">REVIEW IT</span></div>
                      <div className="confirm-preview">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={generatedProduct} alt="AI-generated product" />
                      </div>
                      <p className="confirm-note">Like it? Enter the studio to try it on. Not quite? Tweak the description above and regenerate.</p>
                      <div className="confirm-actions">
                        <button className="button button-outline" onClick={() => setGeneratedProduct(undefined)}>↺ Discard</button>
                        <button className="button button-dark" onClick={() => setView("capture")}>Enter studio <ArrowIcon /></button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {view === "capture" && (
                <>
                  <div className="panel-step"><span>02</span> THE CAMERA MOMENT <span className="step-line" /><span className="step-count">{String(photoCount).padStart(2, "0")} / 05</span></div>

                  {/* Face & Pose Guide - Biometric Style */}
                  {photoCount === 0 && !shooting && (
                    <div className="face-guide">
                      <div className="face-guide-icon">👤</div>
                      <div className="face-guide-content">
                        <h3>Position Your Face</h3>
                        <ul>
                          <li>✓ Face the camera directly</li>
                          <li>✓ Center your face in the frame</li>
                          <li>✓ Ensure good lighting on your face</li>
                          <li>✓ Keep a neutral or natural expression</li>
                        </ul>
                        <p className="face-guide-note">Similar to biometric verification at banks — we need a clear view of your face for processing.</p>
                      </div>
                    </div>
                  )}

                  <div className="capture-instructions">
                    <span className="capture-overline">TAKE A BREATH. BE YOU.</span>
                    <h2>{confirming ? "Is this the one?" : shooting ? "Hold it right there." : photoCount === 0 ? "Whenever you're ready." : photoCount < 5 ? "That's the one." : "You did it."}</h2>
                    <p>{confirming ? "Review frame 01 below — mirror it, brighten it, or retake it. Nothing goes to the AI until you confirm." : shooting ? "The studio is shooting five frames — ten seconds each. Your try-on is already running in the background from frame one." : photoCount === 0 ? "Five frames, ten seconds each. You'll review frame one before it powers your virtual try-on — no posing experience needed." : photoCount < 5 ? "The system is already getting to know your look. Keep going, or reveal your campaign now." : "Your creative team has everything it needs."}</p>
                  </div>

                  {confirming && pendingFrame && (
                    <div className="confirm-panel" role="dialog" aria-label="Review your first frame">
                      <div className="confirm-heading"><span>01</span> REVIEW FRAME 01 <span className="step-line" /><span className="step-count">TRY-ON SOURCE</span></div>
                      <div className="confirm-preview">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pendingFrame}
                          alt="Your first captured frame"
                          style={{ transform: pendingMirror ? "scaleX(-1)" : undefined, filter: pendingBrightness === 1 ? undefined : `brightness(${pendingBrightness})` }}
                        />
                      </div>
                      <p className="confirm-note">This frame becomes your virtual try-on. Adjust it, retake it, or confirm to start the AI.</p>
                      <div className="confirm-edits">
                        <button
                          className={`confirm-toggle${pendingMirror ? " confirm-toggle-on" : ""}`}
                          onClick={() => setPendingMirror((current) => !current)}
                          aria-pressed={pendingMirror}
                        >
                          ⇄ Mirror
                        </button>
                        <div className="confirm-brightness">
                          <label htmlFor="frame-brightness">☀ Brightness</label>
                          <input
                            id="frame-brightness"
                            type="range"
                            min={0.6}
                            max={1.4}
                            step={0.05}
                            value={pendingBrightness}
                            onChange={(event) => setPendingBrightness(Number(event.target.value))}
                          />
                        </div>
                      </div>
                      <div className="confirm-actions">
                        <button className="button button-outline" onClick={retakeFirstFrame}>↺ Retake</button>
                        <button className="button button-dark" onClick={confirmFirstFrame}>Confirm & start try-on <ArrowIcon /></button>
                      </div>
                    </div>
                  )}

                  <div className="shot-counter" aria-label={`${photoCount} of 5 photos captured`}>{Array.from({ length: 5 }, (_, index) => <span key={index} className={index < photoCount ? "shot-taken" : ""}>{index < photoCount ? "✓" : `0${index + 1}`}</span>)}</div>

                  {cameraError && <p className="camera-error" role="status">{cameraError}</p>}

                  <div className="capture-controls">
                    {cameraOn ? <button className="button button-outline full-width" onClick={stopCamera}>Turn camera off</button> : <button className="camera-link" onClick={startCamera}>◎ &nbsp; Use your camera</button>}
                    {!shooting && !confirming && photoCount < 5 && <button className="button button-dark full-width capture-button" onClick={startPhotoshoot}><span className="shutter-icon" />{photoCount === 0 ? "Start photoshoot · 5 frames" : "Continue · frame 02–05"}</button>}
                    {shooting && <div className="shooting-status"><span className="pulse-ring" /> SHOOTING · FRAME {String(Math.min(photoCount + 1, 5)).padStart(2, "0")} / 05</div>}
                  </div>

                  {/* Reset Button */}
                  {photoCount > 0 && (
                    <button className="button button-outline full-width reset-button" onClick={resetCapture}>
                      ↺ Reset & Start Over
                    </button>
                  )}

                  {photoCount < 5 && tryOnStatus === "processing" && <div className="tryon-status"><span className="pulse-ring" /> TRY-ON RUNNING IN BACKGROUND — YOUR LOOK ARRIVES BY FRAME 05…</div>}
                  {photoCount < 5 && tryOnStatus === "done" && <div className="tryon-status"><span className="online-dot" /> LOOK READY — YOUR CAMPAIGN IS BUILDING IN THE BACKGROUND…</div>}
                  {photoCount === 5 && tryOnStatus === "processing" && <div className="tryon-status"><span className="pulse-ring" /> FINISHING YOUR LOOK — THE AI IS DRESSING YOU…</div>}
                  {photoCount === 5 && tryOnStatus === "error" && (
                    <div className="tryon-status tryon-error">
                      <span>TRY-ON FAILED. {cameraError}</span>
                      {photo && <button className="button button-outline" onClick={() => runTryOn(photo)}>Retry try-on</button>}
                    </div>
                  )}
                  {photoCount === 5 && tryOnStatus === "done" && <button className="button button-gold full-width reveal-button" onClick={goToCampaign}>Reveal your campaign <ArrowIcon /></button>}
                  <div className="capture-note"><span className="lock-icon">⌑</span> YOUR PHOTOS STAY RIGHT HERE, IN THE STUDIO.</div>
                </>
              )}

              {view === "campaign" && (
                <>
                  <div className="panel-step"><span>03</span> YOUR CAMPAIGN <span className="step-line" /><span className="step-count">{generatingCampaign ? "GENERATING" : campaignImage ? "READY" : "PENDING"}</span></div>
                  <div className="campaign-title"><span className="capture-overline">MASTER LOOK · {selectedConcept.toUpperCase()}</span><h2>Made of you.<br /><em>Made for more.</em></h2><p>Your look is the beginning. Here's everything your creative team made from it.</p></div>
                  {generatingCampaign && <div className="tryon-status"><span className="pulse-ring" /> THE AI IS BUILDING YOUR CAMPAIGN — IMAGE & POST…</div>}
                  {cameraError && <p className="camera-error" role="status">{cameraError}</p>}
                  <div className="asset-list">
                    <div className="asset-row"><span className="asset-thumb asset-master"><CampaignArtwork concept={selectedConcept} photo={photo} compact processedResult={processedResult} /></span><span><b>Master look</b><small>Virtual try-on · 4:3</small></span><i>01</i></div>
                    <div className="asset-row"><span className="asset-thumb asset-product">{campaignImage ? <CampaignArtwork concept={selectedConcept} compact processedResult={campaignImage} /> : <Sparkle />}</span><span><b>Campaign edit</b><small>{generatingCampaign ? "AI is styling…" : campaignImage ? "AI editorial · 16:9" : "Awaiting generation"}</small></span><i>02</i></div>
                    <div className="asset-row"><span className="asset-thumb asset-story"><span>↗</span></span><span><b>On the move</b><small>Social story · 9:16</small></span><i>03</i></div>
                  </div>
                  {campaignCaption && (
                    <div className="ai-caption">
                      <span className="ai-caption-label"><Sparkle /> AI POST COPY</span>
                      <p>{campaignCaption.split("\n").map((line, index) => index === 0 ? <b key={index}>{line}</b> : <span key={index} className="ai-caption-tags">{line}</span>)}</p>
                    </div>
                  )}
                  <div className="panel-footer campaign-footer"><span><Sparkle /> 03 ASSETS · ONE BIG IDEA</span><button className="button button-dark" onClick={publishCampaign} disabled={!campaignImage || generatingCampaign}>{generatingCampaign ? "Generating…" : "Publish campaign"} <ArrowIcon /></button></div>
                  <div className="delivery-section">
                    <div className="section-heading"><div><h2>Get your images</h2><p>We'll send your product, try-on and campaign shots.</p></div><span className="single-choice">EMAIL OR PHONE</span></div>
                    {contactSent ? (
                      <div className="delivery-done"><span className="online-dot" /> Sent to <b>{contact}</b> — check your inbox.</div>
                    ) : (
                      <>
                        <div className="delivery-row">
                          <input
                            className="delivery-input"
                            type="text"
                            value={contact}
                            onChange={(event) => setContact(event.target.value)}
                            onKeyDown={(event) => { if (event.key === "Enter" && contact.trim() && !sendingContact) void sendImages(); }}
                            placeholder="you@email.com or +84 90 123 4567"
                            aria-label="Email or phone number to receive your images"
                          />
                          <button className="button button-dark delivery-send" onClick={() => void sendImages()} disabled={!contact.trim() || sendingContact}>{sendingContact ? "Sending…" : "Send"}</button>
                        </div>
                        {contactError && <p className="camera-error delivery-error" role="status">{contactError}</p>}
                      </>
                    )}
                  </div>
                </>
              )}
            </section>

            <section className={`stage-panel${view === "capture" ? " stage-capturing" : ""}`} style={activeStageStyle} aria-label="Visual stage">
              <div className="stage-topline"><span><span className="stage-live-dot" /> VISUAL STAGE</span><span>{view === "setup" ? "YOUR CANVAS AWAITS" : view === "campaign" ? "THE FINAL LOOK" : "CREATING IN REAL TIME"}</span></div>
              <div className="stage-art-area">
                <div className={`stage-art-wrap${view === "capture" && cameraOn ? " camera-view" : ""}`}>
                  {view === "capture" && cameraOn ? (
                    <>
                      <video ref={videoRef} autoPlay muted playsInline aria-label="Live camera preview" />
                      {shooting && countdown !== null && countdown > 0 && (
                        <div className="countdown-display" aria-live="polite">
                          <span className="countdown-number">{countdown}</span>
                          <span className="countdown-label">FRAME {String(Math.min(photoCount + 1, 5)).padStart(2, "0")} / 05</span>
                        </div>
                      )}
                    </>
                  ) : <CampaignArtwork concept={selectedConcept} photo={photo} processedResult={view === "setup" ? generatedProduct : processedResult} imageAlt={view === "setup" ? "AI-generated product" : "Virtual try-on result"} />}
                  {view === "capture" && !cameraOn && <div className={`stage-scan${photoCount > 0 ? " scan-active" : ""}`}><span className="scan-corner corner-tl" /><span className="scan-corner corner-tr" /><span className="scan-corner corner-bl" /><span className="scan-corner corner-br" />{photoCount > 0 && <div className="scan-line" />}</div>}
                  {view === "setup" && <div className="floating-tag tag-left"><span className="tag-dot" /> YOUR PRODUCTS</div>}
                  {view === "setup" && <div className="floating-tag tag-right"><Sparkle /> {generatingProduct ? "GENERATING…" : generatedProduct ? "AI PRODUCT READY" : "YOUR CONCEPT"}</div>}
                  {view === "capture" && cameraOn && <div className="frame-label"><span>FRAME {String(Math.min(photoCount + 1, 5)).padStart(2, "0")}</span><span>● REC</span></div>}
                </div>
                <div className="stage-caption">
                  <div className="ai-core"><span /><i /><b /></div>
                  <div className="caption-copy"><span>{view === "setup" ? (generatingProduct ? "GENERATING YOUR PRODUCT" : "YOUR STORY STARTS HERE") : currentJourney.title.toUpperCase()}</span><b>{view === "setup" ? (generatingProduct ? "The AI is crafting your product…" : "A world, made around you.") : currentJourney.cue}</b></div>
                  <div className="stage-index">{view === "setup" ? "—" : `${String(Math.max(1, stageIndex + 1)).padStart(2, "0")} / 06`}</div>
                </div>
              </div>
              <div className="journey">
                <div className="journey-header"><span>THE JOURNEY</span><span>NOTHING DISAPPEARS. EVERYTHING TRANSFORMS.</span></div>
                <div className="journey-track">
                  {journey.map((step, index) => <div className={`journey-step${index < stageIndex ? " journey-complete" : ""}${index === stageIndex ? " journey-current" : ""}`} key={step.short}>
                    <span className="journey-node">{index < stageIndex ? "✓" : <i />}</span><span>{step.short}</span>
                  </div>)}
                </div>
                <div className="journey-progress"><span /></div>
              </div>
              <div className="stage-footer"><span><span className="mini-core"><Sparkle /></span> POWERED BY YOUR IMAGINATION</span><span>{selectedProducts.length + 1} PIECES <i>·</i> {selectedConcept.toUpperCase()}</span></div>
            </section>
          </div>
        </section>
      )}

      <footer className="site-footer"><span>© VYIQ × NORD STORIA 2026</span><span>AN INTELLIGENT CREATIVE EXPERIENCE</span><span>YOU <i>→</i> SYSTEM <i>→</i> LOOK <i>→</i> CAMPAIGN <i>→</i> AUDIENCE</span></footer>

      {theatreMode && view !== "feed" && <div className="theatre-overlay">
        <div className="theatre-top"><span><Sparkle reversed /> VYIQ × NS <i>·</i> VISUAL STAGE</span><button onClick={() => setTheatreMode(false)}>EXIT STAGE <b>×</b></button></div>
        <div className="theatre-content"><CampaignArtwork concept={selectedConcept} photo={photo} useSystemImage={view === "campaign"} processedResult={campaignImage || processedResult} /><div className="theatre-message"><span><span className="stage-live-dot" /> {view === "setup" ? "YOUR STORY STARTS HERE" : currentJourney.title.toUpperCase()}</span><h2>{view === "setup" ? "A world, made around you." : currentJourney.cue}</h2><div className="theatre-track">{journey.map((step, index) => <span key={step.short} className={index <= stageIndex ? "theatre-step-active" : ""} />)}</div><small>YOU <i>→</i> SYSTEM <i>→</i> LOOK <i>→</i> CAMPAIGN <i>→</i> AUDIENCE</small></div></div>
        <div className="theatre-bottom"><span>VYIQ × NS · SHOWCASE 04</span><span>NOTHING DISAPPEARS. EVERYTHING TRANSFORMS.</span></div>
      </div>}
    </main>
  );
}
