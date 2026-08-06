import FormSection from "@/components/admin/FormSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CategoryFormData {
  nome: string;
  descricao: string;
  imagem: string;
  ordem: number;
  ativo: boolean;
}

interface CategoryFormProps {
  formData: CategoryFormData;
  onChange: (
    field: keyof CategoryFormData,
    value: string | number | boolean,
  ) => void;
}

export default function CategoryForm({
  formData,
  onChange,
}: CategoryFormProps) {
  return (
    <div className="space-y-6">
      <FormSection title="Dados da Categoria">
        <div className="space-y-5">
          <div>
            <Label>Nome</Label>

            <Input
              placeholder="Ex: PC Gamer"
              value={formData.nome}
              onChange={(e) => onChange("nome", e.target.value)}
            />
          </div>

          <div>
            <Label>Descrição</Label>

            <Textarea
              placeholder="Descreva essa categoria..."
              value={formData.descricao}
              onChange={(e) => onChange("descricao", e.target.value)}
            />
          </div>

          <div>
            <Label>Imagem</Label>

            <Input
              placeholder="URL da imagem"
              value={formData.imagem}
              onChange={(e) => onChange("imagem", e.target.value)}
            />
          </div>

          <div>
            <Label>Ordem de exibição</Label>

            <Input
              type="number"
              value={formData.ordem}
              onChange={(e) => onChange("ordem", Number(e.target.value))}
            />
          </div>

          <div
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-[#263244]
              bg-[#111827]
              p-4
            "
          >
            <div>
              <p className="font-medium text-white">Categoria ativa</p>

              <p className="text-sm text-slate-400">
                Exibir essa categoria na loja.
              </p>
            </div>

            <Switch
              checked={formData.ativo}
              onCheckedChange={(value) => onChange("ativo", value)}
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
}
