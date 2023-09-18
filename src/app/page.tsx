"use client";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import AppTable from "@/components/app.table";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZmY0Y2JkNmNkYmZjYTVlYjM2YzgyYmZlNzA2MGUyMzRjOTU3MTM2ODgyZTBmYjQ0YTg0NzlhMjU5ZTdmNzMzMTU2MzQ3ZDg5ZDZkMzlhMTMiLCJpYXQiOjE2OTQ3NjQ4NTQuMTIwNDM3LCJuYmYiOjE2OTQ3NjQ4NTQuMTIwNDQxLCJleHAiOjE3MjYzODcyNTQuMTEwOTMsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Ldxw3AXLjJpYFq_HQ2IaXe1DgUeq8r3WkDE4wyBXXzpJqXCJYhiuM8JJTYE450GayeWWdyCsYpQv4HREJ4wLDw6FxTFVtibI_5jLrZvOb_i3S085SDFPi-AapUs8lYJmIXM2_c8BSzHA8sxZi8OjPe88J9SB5YDNVDetkB5Cc-iQdroMVUTJDGR10AVI7jYTItBKRsms5zkrI4J0_1d4U6ixYn0ZZJxpKG3oqaxUZNWUiG6AXKROObRqxrbv7usdow899SEHDN2DYAKgVk3CpNIsFMxHtizUEVtMMMbek7m4qfelIxzjhJLAl5fpet7R5tmDnIjMMp_S7IlKY5QSQPu1QF3fDs2AkCEKTfpSNaXEbyyUpjQ8lRRTnpBomsCWchYGaHK8ilKmU5rKuYN0O8-I9EDqmt3LM_3xCsiN_ynFtG6EsxcotgBaw0QZG7waED30pHDJmgSdtAwaKf-Sbdac49eu864dXEBTgq27EH5qWgQZqjdqanVtv9cLRL4AfJOGRhaGzXq9cUpV08M877QHltUksswoG4KUoHz2UeP8UB_QdtupkdN9BLtm99raC19A59aE8fw7uAilgKq_6gO5rXqBQn9dodzT2hZ62SBm4Ujmvvkk1ASJmdUrQ2bgFPlhMGfQKANEbk2vfcS0H1jeQtKApHhyZWXvdEUP0tQ"}`, // Thay 'yourToken' bằng token thực tế của bạn
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((json) => json.data); // Đặt nó ở đây

  const { data, error, isLoading } = useSWR(
    "http://127.0.0.1:8000/api/nhanvien",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log(">>>check res:", data);

  if (!data) {
    return <div>loading...</div>;
  }
  
  return (
    <div>
      <AppTable nhanviens={data ?.sort((a:any,b:any)=>b.id-a.id)} />
    </div>
  );
}
