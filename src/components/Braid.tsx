export default function Braid({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`braid ${className}`} />
}
