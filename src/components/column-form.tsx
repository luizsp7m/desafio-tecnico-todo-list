import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useBoard } from "@/hooks/use-board";
import { Column } from "@/types/column";

const columnFormSchema = z.object({
  title: z
    .string({ required_error: "O título é obrigatório" })
    .trim()
    .min(3, { message: "O título deve ter pelo menos 3 caracteres" })
    .max(128, {
      message: "O título não deve ter mais do que 128 caracteres",
    }),
});

type ColumnFormData = z.infer<typeof columnFormSchema>;

interface ColumnFormProps {
  selectedColumn?: Column | null;
  handleCloseModal: () => void;
}

export function ColumnForm({
  selectedColumn,
  handleCloseModal,
}: ColumnFormProps) {
  const { upsertColumn } = useBoard();

  const form = useForm<ColumnFormData>({
    resolver: zodResolver(columnFormSchema),
    defaultValues: selectedColumn
      ? {
          title: selectedColumn.title,
        }
      : {
          title: "",
        },
  });

  function onSubmit(values: ColumnFormData) {
    if (selectedColumn) {
      upsertColumn({
        columnId: selectedColumn.id,
        data: values,
      });
    } else {
      upsertColumn({ data: values });
    }

    handleCloseModal();
  }

  return (
    <div className="space-y-4">
      <span className="font-semibold text-muted-foreground">
        {selectedColumn ? "Atualizar coluna" : "Adicionar coluna"}
      </span>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>

            <Button type="submit">
              {selectedColumn ? "Salvar" : "Adicionar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
