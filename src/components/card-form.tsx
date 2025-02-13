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
import { Card } from "@/types/card";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./ui/date-picker";
import { CARD_TAGS } from "@/constants/card-tags";

const cardFormSchema = z.object({
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

  tags: z.nativeEnum(CARD_TAGS).array().optional(),
});

type CardFormData = z.infer<typeof cardFormSchema>;

interface CardFormProps {
  selectedCard?: Card | null;
  columnId: string;
  isFullMode?: boolean;
  handleCloseModal: () => void;
}

export function CardForm({
  selectedCard,
  columnId,
  isFullMode = false,
  handleCloseModal,
}: CardFormProps) {
  const { upsertCard } = useBoard();

  const form = useForm<CardFormData>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: selectedCard
      ? {
          title: selectedCard.title,
          description: selectedCard.description,
          dueDate: selectedCard.dueDate
            ? new Date(selectedCard.dueDate)
            : undefined,
        }
      : {
          title: "",
        },
  });

  function onSubmit(values: CardFormData) {
    console.log(values);

    if (selectedCard) {
      upsertCard({ columnId, cardId: selectedCard.id, data: values });
    } else {
      upsertCard({ columnId, data: values });
    }

    handleCloseModal();
  }

  return (
    <div className="space-y-4">
      <span className="font-semibold text-muted-foreground">
        {selectedCard ? "Atualizar tarefa" : "Adicionar tarefa"}
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

          {isFullMode && (
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

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>

            <Button type="submit">
              {selectedCard ? "Salvar" : "Adicionar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
