export default function LoadingScreen() {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'var(--primary-color)', zIndex: 9999 }}>
      <div className="text-center text-white">
        <div className="loading-spinner mx-auto mb-3"></div>
        <h3>Loading Code Garden...</h3>
      </div>
    </div>
  );
}
