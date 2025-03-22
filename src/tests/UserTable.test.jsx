import { render, screen, fireEvent } from "@testing-library/react";
import { UserTable } from "../components/UsersListTable/UsersListTable";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
describe("UserTable Component", () => {
  const users = [
    { id: 1, name: "John", email: "john@example.com", phone: "1234567890" },
    { id: 2, name: "Jane", email: "jane@example.com", phone: "9876543210" },
  ];

  const mockOnDelete = vi.fn();

  it("renders user rows", () => {
    render(
      <MemoryRouter>
        <UserTable users={users} onDelete={mockOnDelete} />
      </MemoryRouter>
    );
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <MemoryRouter>
        <UserTable users={users} onDelete={mockOnDelete} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
