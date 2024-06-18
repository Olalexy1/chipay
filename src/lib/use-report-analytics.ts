// lib/use-report-analytics.ts

import "client-only";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useReportAnalytics(reportAnalyticsFn: (url: string) => void) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    reportAnalyticsFn(url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);
}
