import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import type { Review } from "@/types/review";

interface ReviewFormProps {
  initialData?: Review;
  onSubmit: (formData: FormData) => Promise<void>;
  loading?: boolean;
}

export default function ReviewForm({
  initialData,
  onSubmit,
  loading = false,
}: ReviewFormProps) {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(5);
  const [ordem, setOrdem] = useState(0);

  const [ativo, setAtivo] = useState(true);
  const [destaque, setDestaque] = useState(false);

  const [avatarArquivo, setAvatarArquivo] = useState<File | null>(null);

  useEffect(() => {
    if (!initialData) return;

    setNome(initialData.nome);
    setCargo(initialData.cargo || "");
    setComentario(initialData.comentario);
    setNota(initialData.nota);
    setOrdem(initialData.ordem);
    setAtivo(initialData.ativo);
    setDestaque(initialData.destaque);
  }, [initialData]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nome", nome);
    formData.append("cargo", cargo);
    formData.append("comentario", comentario);
    formData.append("nota", String(nota));
    formData.append("ordem", String(ordem));
    formData.append("ativo", String(ativo));
    formData.append("destaque", String(destaque));

    if (avatarArquivo) {
      formData.append("avatar", avatarArquivo);
    }

    await onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar */}
      <div className="space-y-2">
        <Label>Avatar</Label>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarArquivo(e.target.files?.[0] || null)}
        />
      </div>

      {/* Nome */}
      <div className="space-y-2">
        <Label>Nome</Label>

        <Input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da pessoa"
          required
        />
      </div>

      {/* Cargo */}
      <div className="space-y-2">
        <Label>Cargo</Label>

        <Input
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          placeholder="Cliente Premium"
        />
      </div>

      {/* Nota */}
      <div className="space-y-2">
        <Label>Nota (1 a 5)</Label>

        <Input
          type="number"
          min={1}
          max={5}
          value={nota}
          onChange={(e) => setNota(Number(e.target.value))}
          required
        />
      </div>

      {/* Ordem */}
      <div className="space-y-2">
        <Label>Ordem</Label>

        <Input
          type="number"
          value={ordem}
          onChange={(e) => setOrdem(Number(e.target.value))}
        />
      </div>

      {/* Comentário */}
      <div className="space-y-2">
        <Label>Comentário</Label>

        <Textarea
          rows={5}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Digite o depoimento..."
          required
        />
      </div>

      {/* Switches */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border rounded-lg p-4">
          <Label>Ativo</Label>

          <Switch checked={ativo} onCheckedChange={setAtivo} />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <Label>Destaque</Label>

          <Switch checked={destaque} onCheckedChange={setDestaque} />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Salvando..." : "Salvar Review"}
      </Button>
    </form>
  );
}
