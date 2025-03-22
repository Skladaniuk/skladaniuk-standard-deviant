import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { UserForm } from "../components/userForm/userForm";
describe("UserForm", () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields and submit button", () => {
    render(
      <UserForm
        initialValues={{ name: "", email: "", phone: "" }}
        onSubmit={mockSubmit}
      />
    );
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("should show validation errors for required fields", async () => {
    render(
      <UserForm
        initialValues={{ name: "", email: "", phone: "" }}
        onSubmit={mockSubmit}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
  });

  it("should show email format error", async () => {
    render(
      <UserForm
        initialValues={{ name: "John", email: "invalid-email", phone: "" }}
        onSubmit={mockSubmit}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
  });

  it("should show phone format error", async () => {
    render(
      <UserForm
        initialValues={{
          name: "John",
          email: "john@example.com",
          phone: "invalid-phone",
        }}
        onSubmit={mockSubmit}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(
      await screen.findByText(/Invalid phone number/i)
    ).toBeInTheDocument();
  });

  it("should call onSubmit with form data on valid submit", async () => {
    render(
      <UserForm
        initialValues={{
          name: "John",
          email: "john@example.com",
          phone: "123-456-7890",
        }}
        onSubmit={mockSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: "123-456-7890" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() =>
      expect(mockSubmit).toHaveBeenCalledWith(
        {
          name: "John",
          email: "john@example.com",
          phone: "123-456-7890",
        },
        expect.any(Object)
      )
    );
  });

  it("should reset form fields when initialValues prop changes", () => {
    const { rerender } = render(
      <UserForm
        initialValues={{ name: "John", email: "john@example.com", phone: "" }}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText(/Name/i).value).toBe("John");
    expect(screen.getByLabelText(/Email/i).value).toBe("john@example.com");
    expect(screen.getByLabelText(/Phone/i).value).toBe("");

    rerender(
      <UserForm
        initialValues={{
          name: "Jane",
          email: "jane@example.com",
          phone: "987-654-3210",
        }}
        onSubmit={mockSubmit}
      />
    );

    expect(screen.getByLabelText(/Name/i).value).toBe("Jane");
    expect(screen.getByLabelText(/Email/i).value).toBe("jane@example.com");
    expect(screen.getByLabelText(/Phone/i).value).toBe("987-654-3210");
  });
});
