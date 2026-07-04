import { TerminalView } from "./components/TerminalView";
import { useTerminalController } from "./hooks/useTerminalController";

export function Terminal() {
  return <TerminalView {...useTerminalController()} />;
}
