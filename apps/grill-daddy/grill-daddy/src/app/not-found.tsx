const message = 'Oops! We couldn’t find the page you’re looking for.'

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>{message}</p>
    </div>
  );
}