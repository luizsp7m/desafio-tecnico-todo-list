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
import { useBoardColumnFormModalStore } from "@/store/board-column-form-modal-store";
import { useBoardStore } from "@/store/board-store";

const boardColumnFormSchema = z.object({
  title: z
    .string({ required_error: "O título é obrigatório" })
    .trim()
    .min(3, { message: "O título deve ter pelo menos 3 caracteres" })
    .max(128, {
      message: "O título não deve ter mais do que 128 caracteres",
    }),
});

export type BoardColumnFormData = z.infer<typeof boardColumnFormSchema>;

export function BoardColumnForm() {
  const { handleCloseBoardColumnFormModal, selectedBoardColumn } =
    useBoardColumnFormModalStore();

  const { upsertBoardColumn } = useBoardStore();

  const form = useForm<BoardColumnFormData>({
    resolver: zodResolver(boardColumnFormSchema),
    defaultValues: selectedBoardColumn
      ? {
          title: selectedBoardColumn.title,
        }
      : {
          title: "",
        },
  });

  function onSubmit(values: BoardColumnFormData) {
    if (selectedBoardColumn) {
      upsertBoardColumn({
        boardColumnId: selectedBoardColumn.id,
        data: values,
      });
    } else {
      upsertBoardColumn({ data: values });
    }

    handleCloseBoardColumnFormModal();
  }

  return (
    <div className="space-y-4">
      <span className="font-semibold text-muted-foreground">
        {selectedBoardColumn ? "Atualizar coluna" : "Adicionar coluna"}
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
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseBoardColumnFormModal}
            >
              Cancelar
            </Button>

            <Button type="submit">
              {selectedBoardColumn ? "Salvar" : "Adicionar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
