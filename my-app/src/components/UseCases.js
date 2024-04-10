import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Hero from "./Landing/components/Hero";
import Footer from "./Landing/components/Footer";

const features = [
  {
    name: "Relief Pharmacists - They float around different cities to cover shifts in pharmacy.",
    description: [
      "Step 1 Take pictures of physical receipts >",
      "Step 2 Download email receipts if any, on phone ",
      "Step 3 upload & watch your full expense report getting ready - includes accommodation, taxi, gas money, meals etc. all organized in one expense report + 1 single PDF file of your uploaded receipts.",
      "Step 4 all you need to do is verify & hit “forward” from your inbox to finance department.",
    ],
    icon: CloudArrowUpIcon,
  },
  {
    name: "Travel Nurses & Doctors - They travel to different locations to provide healthcare services.",
    description: [
      "Life can be busy for you as you are always on the go. And if you are the type who dreads to sit down and do expense reports then this will delight you so much.",
      "> Your Job - To upload receipts",
      "Our job - in 60 seconds, send you fully organized expense report + Compiled Pdf file of your receipts you had uploaded straight to your Inbox.",
      ">Your job - Verify & hit “Forward” to finance department 😇",
    ],
    icon: LockClosedIcon,
  },
  {
    name: "Event Planners - Busy organizers juggling many things at once.",
    description: [
      ">Usually deals with the most receipts to account for expenses at the end of each event they organize. Let us take care of the manual sorting of receipts and data entry. ",
      ">All you need to do is Upload your receipts and watch our AI do the job for you. ",
      ">Your end of the event bookkeeping job will be breeze. ",
    ],
    icon: ArrowPathIcon,
  },
  {
    name: "Bookkeeper’s Assistant - A supercharged efficiency hack.",
    description: [
      "> A bookkeeper typically records all transactions, keeps them organized and easy to track and account for. Imagine having an assistant organizing all the receipts at a record speed with great accuracy. You just upload receipts and relax.",
    ],
    icon: FingerPrintIcon,
  },
  {
    name: "Family Expense tracker - end of the year Tax Stress relief.",
    description: [
      ">Whenever you wish to calculate your monthly expense, all you need to do is upload your receipts. ",
      ">Our AI will figure out what types of expenses you spent on, how much you spent on and the total expenses - all organized in one report delivered in your inbox. ",
      ">It is a great tool to use for monthly expense tracking and end of the year expenses accounting.",
    ],
    icon: FingerPrintIcon,
  },
  {
    name: "Small Business Expense Tracker - Save extra fees by accountants.",
    description: [
      ">Whenever you wish to calculate your monthly expenses, all you need to do is upload your receipts. Our AI will figure out what types of expenses you spent on, how much you spent on and the total expenses - all organized in one report delivered in your inbox. ",
      ">It is a great tool to use for monthly expense tracking and end of the year expenses accounting.",
    ],
    icon: FingerPrintIcon,
  },
  {
    name: "Contractors - You are busy, We save you time & energy after each job you complete.",
    description: [
      ">Submit all your receipts for reimbursement to your client in 1 minute, Yeah! Contractors like plumbers, home renovators, electrician, painters - they all have to buy the materials needed for the job and expense to the client which becomes an hour long task when they sit down to do it.",
      ">>Well Not anymore - All you need is upload the receipts to our tool and it will generate a detailed expense report with your details, your client details, and expenses details along with the final total.",
    ],
    icon: FingerPrintIcon,
  },
  {
    name: "Managers, Executives & Sales Rep - Corporate Travel with Ease",
    description: [
      ">These professionals have got a lot on their plate from managing employees, to answering third parties and communicating internally with other departments of their company.",
      ">But did you know, they also have to “submit their expense report” just like every other employee to their finance department. The worse part is they have to do this every few days to not miss the payroll date. So we bring our AI to assist them in this task which would normally take them about an hour to do, almost every week.",
      ">Your corporate travel app now has superpowers.",
    ],
    icon: FingerPrintIcon,
  },
];

const para2 =
"Upload your receipts, relax, and observe as your expense report is prepared.";
export default function UseCases() {
  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Use Cases
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-3 top-2 flex h-5 w-5 items-center justify-center rounded-full "  style={{ background: "#ca0a66" }}>

                    </div>
                    {feature.name}
                  </dt>
                  {feature.description.map((desc) => (
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {desc}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <Hero text={"Get Started"} para={para2} color={false} />
      <Footer />
    </>
  );
}
