import { Separator } from "@/components/ui/separator";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6 w-5/6">
      <div>
        <h3 className="text-lg font-medium">
          Welcome to 01 Dashboard – The Future of Chatbot Communication
          Management
        </h3>
        <p className="text-sm text-muted-foreground pt-4">
          At Zero One, we understand the complexities of managing chatbot
          communications across various channels. Our cutting-edge tool is
          designed to simplify this process, offering you a unified and
          efficient approach to monitor, analyze, and enhance interactions with
          your customers.
        </p>
        <div>
          <ul>
            <li className="text-sm text-slate-400 mt-7">
              <h2 className="text-base text-slate-300 font-bold">
                Seamless Integration Across Platforms: ChatSync Monitor
              </h2>
              effortlessly integrates with popular platforms like WhatsApp,
              Instagram, Messenger, Telegram, and Web-based chat services. This
              means you can track all chatbot communications from a single,
              easy-to-use dashboard.
            </li>

            <li className="text-sm text-slate-400 mt-7">
              <h2 className="text-base text-slate-300 font-bold">
                Real-Time Monitoring and Analysis: Stay on top of your chatbot
              </h2>
              communications with real-time monitoring. ChatSync Monitor
              provides detailed insights into each interaction, helping you
              understand customer needs and preferences better.
            </li>

            <li className="text-sm text-slate-400 mt-7">
              <h2 className="text-base text-slate-300 font-bold">
                Enhanced Customer Engagement: With our tool, you can quickly
              </h2>
              identify areas for improvement in your chatbot communications.
              This leads to more meaningful and effective interactions with your
              customers, enhancing their overall experience.
            </li>

            <li className="text-sm text-slate-400 mt-7">
              <h2 className="text-base text-slate-300 font-bold">
                Data-Driven Decision Making: Leverage the power of data with
              </h2>
              ChatSync Monitor. Our comprehensive analytics help you make
              informed decisions, improving your chatbot&apos;s performance and
              your business&apos;s bottom line.
            </li>

            <li className="text-sm text-slate-400 mt-7">
              <h2 className="text-base text-slate-300 font-bold">
                Security and Compliance: We prioritize the security of your
                data.
              </h2>
              ChatSync Monitor adheres to the highest standards of data privacy
              and security, ensuring that your communications are protected.
            </li>
          </ul>
        </div>
      </div>
      <Separator />
    </div>
  );
}
