import "./WelcomeSidebar.css"


function WelcomeSidebar({ displayName = "there" }) {
    return (
        <div className="welcome-card">
            <h3 className="welcome-title">Welcome, <span className="highlight">{displayName}</span>!</h3>
            
            <p className="welcome-text">
                This is your personal space to connect, share ideas, and stay updated with your team.
            </p>
            
            <p className="welcome-text muted">
                Explore the feed to see what's happening right now or start a conversation by creating a new post.
            </p>

            <div className="welcome-footer">
                <span className="version-tag">Version 1.0 Alpha</span>
            </div>
        </div>
    );
}

export default WelcomeSidebar
