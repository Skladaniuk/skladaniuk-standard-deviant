import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmationWindow } from "../components/ConfirmationWindow/ConfirmationWindow";
import { vi } from "vitest";
describe("ConfirmationWindow Component", () => {
  const mockOnConfirm = vi.fn();
  const mockOnClose = vi.fn();

  it("calls onConfirm when delete is clicked", () => {
    render(
      <ConfirmationWindow
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });

    fireEvent.click(deleteButton);
    expect(mockOnConfirm).toHaveBeenCalled();
  });
});
