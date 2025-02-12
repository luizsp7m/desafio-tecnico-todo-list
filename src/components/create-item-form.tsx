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

function formTitle(type: CreateItemFormProps["type"]) {
  switch (type) {
    case "column":
      return "Adicionar categoria";

    case "card":
      return "Adicionar tarefa";

    default:
      return "";
  }
}

const createItemSchema = z.object({
  title: z
    .string({ required_error: "O título é obrigatório" })
    .min(3, { message: "O título deve ter pelo menos 3 caracteres" })
    .max(128, {
      message: "O título não deve ter mais do que 128 caracteres",
    }),
});

type CreateItemSchema = z.infer<typeof createItemSchema>;

interface CreateItemFormProps {
  type: "column" | "card";
  columnId?: string;
  handleCloseModal: () => void;
}

export function CreateItemForm({
  type,
  columnId,
  handleCloseModal,
}: CreateItemFormProps) {
  const { createNewColumn, createNewCard } = useBoard();

  const form = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: CreateItemSchema) {
    if (type === "column") {
      createNewColumn({ title: values.title });
      handleCloseModal();
      return;
    }

    if (type === "card" && columnId) {
      createNewCard({ title: values.title, columnId });
      handleCloseModal();
      return;
    }
  }

  return (
    <div className="space-y-4">
      <span className="font-semibold text-muted-foreground">
        {formTitle(type)}
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

            <Button type="submit">Adicionar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
