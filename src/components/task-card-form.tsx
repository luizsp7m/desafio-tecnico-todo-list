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
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./ui/date-picker";
import { useBoardStore } from "@/store/board-store";
import { useTaskCardFormModalStore } from "@/store/task-card-form-modal-store";
import { DeleteTaskCardButton } from "./delete-task-card-button";

const taskCardFormSchema = z.object({
  title: z
    .string({ required_error: "O título é obrigatório" })
    .trim()
    .min(3, { message: "O título deve ter pelo menos 3 caracteres" })
    .max(128, {
      message: "O título não deve ter mais do que 128 caracteres",
    }),

  description: z
    .string()
    .trim()
    .max(512, {
      message: "A descrição não deve ter mais do que 512 caracteres",
    })
    .optional(),

  dueDate: z.date().optional(),
});

export type TaskCardFormData = z.infer<typeof taskCardFormSchema>;

export function TaskCardForm() {
  const { upsertTaskCard } = useBoardStore();

  const { selectedTaskCard, boardColumnId, handleCloseTaskCardFormModal } =
    useTaskCardFormModalStore();

  const form = useForm<TaskCardFormData>({
    resolver: zodResolver(taskCardFormSchema),
    defaultValues: selectedTaskCard
      ? {
          title: selectedTaskCard.title,
          description: selectedTaskCard.description || undefined,
          dueDate: selectedTaskCard.dueDate
            ? new Date(selectedTaskCard.dueDate)
            : undefined,
        }
      : {
          title: "",
        },
  });

  function onSubmit(values: TaskCardFormData) {
    if (!boardColumnId) return;

    if (selectedTaskCard) {
      upsertTaskCard({
        boardColumnId,
        taskCardId: selectedTaskCard.id,
        data: values,
      });
    } else {
      upsertTaskCard({ boardColumnId, data: values });
    }

    handleCloseTaskCardFormModal();
  }

  return (
    <div className="space-y-4">
      <span className="font-semibold text-muted-foreground">
        {selectedTaskCard ? "Atualizar tarefa" : "Adicionar tarefa"}
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

          {!!selectedTaskCard && (
            <>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>

                    <FormControl>
                      <Textarea className="resize-none" rows={5} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <DatePicker value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex items-center">
            {selectedTaskCard && boardColumnId && (
              <DeleteTaskCardButton
                taskCardId={selectedTaskCard.id}
                boardColumnId={boardColumnId}
              />
            )}

            <div className="flex flex-1 justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseTaskCardFormModal}
              >
                Cancelar
              </Button>

              <Button type="submit">
                {selectedTaskCard ? "Salvar" : "Adicionar"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
