interface Props {
  kind: "idle" | "loading" | "error";
  message?: string;
  onRetry?: () => void;
}

export default function StatusView({ kind, message, onRetry }: Props) {
  if (kind === "loading") {
    return (
      <div className="panel status" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p>Đang tải dữ liệu thời tiết…</p>
      </div>
    );
  }

  if (kind === "error") {
    return (
      <div className="panel status" role="alert">
        <p className="status-title">Không tải được thời tiết</p>
        <p className="muted">{message}</p>
        <button type="button" className="retry-btn" onClick={onRetry}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="panel status">
      <p className="status-title">Chưa chọn thành phố</p>
      <p className="muted">Chọn một thành phố trong danh sách để xem thời tiết hiện tại và dự báo 7 ngày.</p>
    </div>
  );
}
