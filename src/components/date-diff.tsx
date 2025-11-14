import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ClockIcon } from "lucide-react";

dayjs.extend(relativeTime);

// display difference between date and today's date in human readable format (using dayjs)
export default function DateDiff(date: Date) {
  return (
    <div>
      <ClockIcon className="inline h-4 mr-1 mb-1" />
      <span>{dayjs(date).fromNow()}</span>
    </div>
  );
}
