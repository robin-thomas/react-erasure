import React, { useState, useEffect } from "react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Timer = (props) => {
  const [time] = useState(props.time);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const str = formatDistanceToNow(time, { includeSeconds: true });
      setTimeStr(`${str} ago`);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return <small>{timeStr}</small>;
}

export default Timer;
