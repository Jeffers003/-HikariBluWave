import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function FormSection({ title, children }: Props) {
  return (
    <Card className="border border-[#046AEE]/20 bg-[#070B14]">
      <CardContent className="space-y-5 p-6">
        <h2
          className="text-xl text-[#046AEE]"
          style={{ fontFamily: "Audiowide" }}
        >
          {title}
        </h2>

        {children}
      </CardContent>
    </Card>
  );
}
