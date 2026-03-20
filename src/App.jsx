import { useState, useRef, useEffect } from "react";
import styles from "./App.module.css";

// ── MOCK DATA ──
const DEMO_POSTS = [
  
];

// ── TOAST ──
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`${styles.toast} ${type === "success" ? styles.toastSuccess : styles.toastError}`}>
      <span>{type === "success" ? "✅" : "❌"}</span>
      <span>{msg}</span>
    </div>
  );
}

// ── INSTALL BANNER ──
function InstallBanner({ onInstall, onDismiss }) {
  return (
    <div className={styles.installBanner}>
      <div className={styles.installIcon}>📲</div>
      <div className={styles.installText}>
        <strong>Add to Home Screen</strong>
        <span>Install for offline access &amp; fast launch</span>
      </div>
      <div className={styles.installActions}>
        <button className={styles.btnInstall} onClick={onInstall}>Install</button>
        <button className={styles.btnDismiss} onClick={onDismiss}>✕</button>
      </div>
    </div>
  );
}

// ── AUTH ──
function AuthScreen({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = () => {
    setError("");
    if (!email || !pass) return setError("Please fill all required fields.");
    if (tab === "signup" && !name) return setError("Name is required.");
    if (pass.length < 4) return setError("Password must be at least 4 characters.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: name || email.split("@")[0], email });
    }, 900);
  };

  return (
    <div className={styles.authWrap}>
      <div className={styles.authGlow} />
      <div className={styles.authCard}>
        <div className={styles.authLogo}>✦ Lumina</div>
        <div className={styles.authTagline}>Your creative media companion</div>
        <div className={styles.authTabs}>
          <button className={`${styles.authTab} ${tab === "login" ? styles.authTabActive : ""}`}
            onClick={() => { setTab("login"); setError(""); }}>Sign In</button>
          <button className={`${styles.authTab} ${tab === "signup" ? styles.authTabActive : ""}`}
            onClick={() => { setTab("signup"); setError(""); }}>Sign Up</button>
        </div>
        {error && <div className={styles.authError}>⚠️ {error}</div>}
        {tab === "signup" && (
          <div className={styles.field}>
            <label>Full Name</label>
            <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
          </div>
        )}
        <div className={styles.field}>
          <label>Email</label>
          <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handle()} />
        </div>
        <button className={styles.btnPrimary} onClick={handle} disabled={loading}>
          {loading ? <span className={styles.spinner} /> : tab === "login" ? "Sign In →" : "Create Account →"}
        </button>
        <div className={styles.authHint}>
          {tab === "login"
            ? <>No account? <span onClick={() => setTab("signup")}>Sign up free</span></>
            : <>Already have one? <span onClick={() => setTab("login")}>Sign in</span></>}
        </div>
      </div>
    </div>
  );
}

// ── POST CARD ──
function PostCard({ post, currentUser }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [remarks, setRemarks] = useState(post.remarks);
  const [remarkText, setRemarkText] = useState("");
  const [showRemarks, setShowRemarks] = useState(false);

  const handleLike = () => {
    setLiked(l => !l);
    setLikes(n => liked ? n - 1 : n + 1);
  };

  const addRemark = () => {
    if (!remarkText.trim()) return;
    const r = {
      id: Date.now(),
      user: currentUser.name,
      initials: currentUser.name.slice(0, 2).toUpperCase(),
      text: remarkText.trim()
    };
    setRemarks(prev => [...prev, r]);
    setRemarkText("");
  };

  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <div className={styles.userAvatar}>{post.initials}</div>
        <div className={styles.postMeta}>
          <strong>{post.user}</strong>
          <span>{post.time}</span>
        </div>
      </div>
      <div className={styles.postBody}>{post.body}</div>
      {post.media && (
        <div className={styles.postMedia}>
          {post.media.type === "image"
            ? <img src={post.media.url} alt="post media" loading="lazy" />
            : <video src={post.media.url} controls playsInline />
          }
        </div>
      )}
      <div className={styles.postActions}>
        <button
          className={`${styles.btnAction} ${liked ? styles.btnActionLiked : ""}`}
          onClick={handleLike}>
          {liked ? "♥" : "♡"} {likes}
        </button>
        <button className={styles.btnAction} onClick={() => setShowRemarks(s => !s)}>
          💬 {remarks.length}
        </button>
        <button className={styles.btnAction}>↗ Share</button>
      </div>
      {showRemarks && (
        <div className={styles.postRemarks}>
          {remarks.length > 0 && (
            <div className={styles.remarkList}>
              {remarks.map(r => (
                <div className={styles.remarkItem} key={r.id}>
                  <div className={styles.remarkAvatar}>{r.initials}</div>
                  <div className={styles.remarkBubble}>
                    <strong>{r.user}</strong>
                    <p>{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className={styles.remarkInputRow}>
            <input className={styles.remarkInput} placeholder="Add a remark…"
              value={remarkText} onChange={e => setRemarkText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addRemark()} />
            <button className={styles.btnRemark} onClick={addRemark}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── UPLOAD COMPOSER ──
function UploadComposer({ user, onPost }) {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const imgRef = useRef();
  const vidRef = useRef();

  const handleFile = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setMediaType(type);
  };

  const handlePost = () => {
    if (!text.trim() && !preview) return;
    onPost({
      id: Date.now(), user: user.name,
      initials: user.name.slice(0, 2).toUpperCase(),
      body: text, time: "just now", likes: 0,
      media: preview ? { type: mediaType, url: preview } : null,
      remarks: []
    });
    setText(""); setPreview(null); setMediaType(null);
  };

  return (
    <div className={styles.uploadCard}>
      <div className={styles.uploadCardHeader}>
        <div className={styles.userAvatar}>{user.name.slice(0, 2).toUpperCase()}</div>
        <span className={styles.uploadHint}>What's on your mind?</span>
      </div>
      <textarea className={styles.uploadTextarea}
        placeholder="Write something…" value={text}
        onChange={e => setText(e.target.value)} rows={3} />
      {preview && (
        <div className={styles.previewArea}>
          {mediaType === "image"
            ? <img className={styles.previewImg} src={preview} alt="preview" />
            : <video className={styles.previewVid} src={preview} controls />
          }
          <button className={styles.previewRemove} onClick={() => { setPreview(null); setMediaType(null); }}>✕</button>
        </div>
      )}
      <div className={styles.uploadActions}>
        <input ref={imgRef} type="file" accept="image/*" style={{ display: "none" }}
          onChange={e => handleFile(e, "image")} />
        <input ref={vidRef} type="file" accept="video/*" style={{ display: "none" }}
          onChange={e => handleFile(e, "video")} />
        <button className={styles.btnUploadType} onClick={() => imgRef.current.click()}>🖼 Photo</button>
        <button className={styles.btnUploadType} onClick={() => vidRef.current.click()}>🎬 Video</button>
        <button className={styles.btnPost} onClick={handlePost} disabled={!text.trim() && !preview}>
          Post
        </button>
      </div>
    </div>
  );
}

// ── PAGES ──
function HomePage({ user, posts, onPost }) {
  return (
    <div>
      <div className={styles.sectionTitle}>Your <span>Feed</span></div>
      <UploadComposer user={user} onPost={onPost} />
      {posts.map(p => <PostCard key={p.id} post={p} currentUser={user} />)}
    </div>
  );
}

function GalleryPage({ posts }) {
  const media = posts.filter(p => p.media);
  if (!media.length) return (
    <div>
      <div className={styles.sectionTitle}>Media <span>Gallery</span></div>
      <div className={styles.galleryEmpty}>
        <div className={styles.emptyIcon}>🖼</div>
        <p>No media yet. Go post something!</p>
      </div>
    </div>
  );
  return (
    <div>
      <div className={styles.sectionTitle}>Media <span>Gallery</span></div>
      <div className={styles.galleryGrid}>
        {media.map(p => (
          <div className={styles.galleryItem} key={p.id}>
            {p.media.type === "image"
              ? <img src={p.media.url} alt="" loading="lazy" />
              : <video src={p.media.url} muted loop />
            }
            <div className={styles.galleryBadge}>{p.media.type === "video" ? "🎬" : "🖼"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfilePage({ user, posts }) {
  const userPosts = posts.filter(p => p.user === user.name);
  const mediaCount = userPosts.filter(p => p.media).length;
  const totalLikes = userPosts.reduce((a, p) => a + p.likes, 0);
  return (
    <div>
      <div className={styles.sectionTitle}>Your <span>Profile</span></div>
      <div className={styles.profileHero}>
        <div className={styles.profileBigAvatar}>{user.name.slice(0, 2).toUpperCase()}</div>
        <div className={styles.profileName}>{user.name}</div>
        <div className={styles.profileEmail}>{user.email}</div>
        <div className={styles.profileStats}>
          <div className={styles.stat}><strong>{userPosts.length}</strong><span>Posts</span></div>
          <div className={styles.stat}><strong>{mediaCount}</strong><span>Media</span></div>
          <div className={styles.stat}><strong>{totalLikes}</strong><span>Likes</span></div>
        </div>
      </div>
      <div className={styles.profileInfoCard}>
        {[
          ["Name", user.name],
          ["Email", user.email],
          ["Joined", "Today"],
          ["Plan", "✦ Free"],
        ].map(([k, v]) => (
          <div className={styles.infoRow} key={k}>
            <span>{k}</span>
            <span style={k === "Plan" ? { color: "var(--success)" } : {}}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ROOT APP ──
export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [toast, setToast] = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = e => { e.preventDefault(); setInstallPrompt(e); setShowInstall(true); };
    window.addEventListener("beforeinstallprompt", handler);
    const timer = setTimeout(() => { if (user) setShowInstall(true); }, 4000);
    return () => { window.removeEventListener("beforeinstallprompt", handler); clearTimeout(timer); };
  }, [user]);

  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === "accepted") showToast("App installed! 🎉", "success");
    } else {
      showToast("Tap Share → Add to Home Screen to install", "success");
    }
    setShowInstall(false);
  };

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const handlePost = post => {
    setPosts(prev => [post, ...prev]);
    showToast("Posted! ✨", "success");
  };

  const NAV = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "gallery", icon: "🖼", label: "Gallery" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  if (!user) {
    return (
      <>
        <AuthScreen onLogin={u => { setUser(u); showToast(`Welcome, ${u.name}! 👋`, "success"); }} />
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </>
    );
  }

  return (
    <div className={styles.app}>
      <header className={styles.topbar}>
        <div className={styles.topbarLogo}>✦ Lumina</div>
        <div className={styles.topbarRight}>
          <div className={styles.userChip}>
            <div className={styles.userAvatar}>{user.name.slice(0, 2).toUpperCase()}</div>
            <span className={styles.userName}>{user.name}</span>
          </div>
          <button className={styles.btnLogout}
            onClick={() => { setUser(null); setTab("home"); showToast("Signed out. See you soon!", "success"); }}>
            Sign Out
          </button>
        </div>
      </header>

      <main className={styles.content}>
        {tab === "home" && <HomePage user={user} posts={posts} onPost={handlePost} />}
        {tab === "gallery" && <GalleryPage posts={posts} />}
        {tab === "profile" && <ProfilePage user={user} posts={posts} />}
      </main>

      <nav className={styles.bottomNav}>
        {NAV.map(n => (
          <button key={n.id}
            className={`${styles.navItem} ${tab === n.id ? styles.navItemActive : ""}`}
            onClick={() => setTab(n.id)}>
            <div className={styles.navIndicator} />
            <span className={styles.navIcon}>{n.icon}</span>
            <span className={styles.navLabel}>{n.label}</span>
          </button>
        ))}
      </nav>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      {showInstall && <InstallBanner onInstall={handleInstall} onDismiss={() => setShowInstall(false)} />}
    </div>
  );
}
