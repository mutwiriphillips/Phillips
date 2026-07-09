import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Trash2, Check, ArrowRight, Loader2, ShoppingCart } from "lucide-react";
import { Card, Pill, Btn, cn } from "../components/ui";
import { useCart, type CartItem } from "../lib/cart";
import { api, ApiError, type Division } from "../lib/api";

const DIVISION_LABEL: Record<Division, string> = {
  digitizebiz: "DigitizeBiz",
  citizenease: "CitizenEase",
};

const DIVISION_TONE: Record<Division, "teal" | "clay"> = {
  digitizebiz: "teal",
  citizenease: "clay",
};

function ItemChecklist({ item }: { item: CartItem }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const tone = DIVISION_TONE[item.division];
  const doneCount = item.docs.filter((_, i) => checked[i]).length;

  return (
    <div className="space-y-2">
      {item.docs.map((d, i) => (
        <label key={d} className="flex items-center gap-3 rounded-lg border border-line dark:border-line-dark px-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!checked[i]}
            onChange={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
            className={cn("w-4 h-4", tone === "teal" ? "accent-teal" : "accent-clay")}
          />
          <span
            className={cn("text-sm text-ink dark:text-[#EDE9DD]", checked[i] && "line-through opacity-60")}
          >
            {d}
          </span>
        </label>
      ))}
      {item.docs.length > 0 && (
        <p className={cn("text-xs font-semibold", tone === "teal" ? "text-teal" : "text-clay")}>
          {doneCount} of {item.docs.length} ready
        </p>
      )}
    </div>
  );
}

export function Cart() {
  const { items, remove, clear } = useCart();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const divisions = Array.from(new Set(items.map((i) => i.division)));

  async function handleCheckout(e: FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2 || contact.trim().length < 5) {
      setError("Add your name and a phone number or email.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError("");

    // One consultation per division present in the cart — keeps each request cleanly
    // scoped to the division's own admin queue and notification templates, even
    // though the client experiences it as a single checkout.
    const results = await Promise.allSettled(
      divisions.map((division) =>
        api.submitConsultation({
          name,
          contact,
          division,
          message,
          services: items.filter((i) => i.division === division).map((i) => i.name),
        })
      )
    );

    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length === results.length) {
      // Every request failed — nothing succeeded, let the client retry cleanly.
      const first = failed[0] as PromiseRejectedResult;
      setStatus("error");
      setError(first.reason instanceof ApiError ? first.reason.message : "Something went wrong. Please try again.");
      return;
    }

    setStatus("done");
    clear();
  }

  if (status === "done") {
    return (
      <section className="max-w-2xl mx-auto px-5 sm:px-8 pt-20 pb-24 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 bg-teal-soft dark:bg-teal/20">
          <Check size={24} className="text-teal" />
        </div>
        <h1 className="font-display text-3xl mb-2 text-ink dark:text-[#EDE9DD]">Request sent</h1>
        <p className="text-sm text-[#6B6153] dark:text-[#9AA3B5] mb-8">
          We've received your request and will reach out shortly to get started.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/">
            <Btn variant="outline">Back to home</Btn>
          </Link>
          <Link to="/digitizebiz">
            <Btn tone="teal">Browse more services</Btn>
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="max-w-xl mx-auto px-5 sm:px-8 pt-20 pb-24 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 bg-ink/10 dark:bg-white/10">
          <ShoppingCart size={22} className="text-ink dark:text-[#EDE9DD]" />
        </div>
        <h1 className="font-display text-3xl mb-2 text-ink dark:text-[#EDE9DD]">Your cart is empty</h1>
        <p className="text-sm text-[#6B6153] dark:text-[#9AA3B5] mb-8">
          Add a service from DigitizeBiz or CitizenEase to start a request.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/digitizebiz">
            <Btn tone="teal">Browse DigitizeBiz</Btn>
          </Link>
          <Link to="/citizenease">
            <Btn tone="clay">Browse CitizenEase</Btn>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 pb-24">
      <h1 className="font-display text-3xl sm:text-4xl mb-2 text-ink dark:text-[#EDE9DD]">Your cart</h1>
      <p className="text-sm mb-8 text-[#6B6153] dark:text-[#9AA3B5]">
        Review what you'll need for each service, then check out as one request.
      </p>

      <div className="space-y-4 mb-10">
        {items.map((item) => (
          <Card key={item.key}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <Pill tone={DIVISION_TONE[item.division]}>{DIVISION_LABEL[item.division]}</Pill>
                <p className="font-display text-xl mt-2 text-ink dark:text-[#EDE9DD]">{item.name}</p>
              </div>
              <button
                onClick={() => remove(item.key)}
                aria-label={`Remove ${item.name} from cart`}
                className="text-[#6B6153] dark:text-[#9AA3B5] hover:text-clay flex-shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <ItemChecklist item={item} />
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="font-display text-2xl mb-1 text-ink dark:text-[#EDE9DD]">Checkout</h2>
        <p className="text-sm mb-5 text-[#6B6153] dark:text-[#9AA3B5]">
          One set of details covers every service above — admin will reach out to confirm the rest.
        </p>
        <form onSubmit={handleCheckout} className="space-y-3">
          <input
            aria-label="Full name"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-line dark:border-line-dark bg-transparent px-4 py-2.5 text-sm text-ink dark:text-[#EDE9DD]"
          />
          <input
            aria-label="Phone or email"
            placeholder="Phone or email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full rounded-lg border border-line dark:border-line-dark bg-transparent px-4 py-2.5 text-sm text-ink dark:text-[#EDE9DD]"
          />
          <textarea
            aria-label="Anything else we should know?"
            placeholder="Anything else we should know? (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-line dark:border-line-dark bg-transparent px-4 py-2.5 text-sm text-ink dark:text-[#EDE9DD] resize-none"
          />
          {status === "error" && <p className="text-sm text-clay">{error}</p>}
          <Btn type="submit" disabled={status === "submitting"} className="w-full">
            {status === "submitting" ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                Check out {items.length} service{items.length === 1 ? "" : "s"} <ArrowRight size={15} />
              </>
            )}
          </Btn>
        </form>
      </Card>
    </section>
  );
}
