import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="container">
      <h1 className="title">Home</h1>
    </div>
  );
}
