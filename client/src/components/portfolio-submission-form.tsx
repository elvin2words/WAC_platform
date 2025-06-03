import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertPortfolioItemSchema, CreativeProfile } from "@shared/schema";

const portfolioSubmissionSchema = insertPortfolioItemSchema.extend({
  tags: z.array(z.string()).optional(),
});

type PortfolioSubmissionData = z.infer<typeof portfolioSubmissionSchema>;

export function PortfolioSubmissionForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: creatives } = useQuery<CreativeProfile[]>({
    queryKey: ["/api/creatives"],
  });

  const form = useForm<PortfolioSubmissionData>({
    resolver: zodResolver(portfolioSubmissionSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      style: "",
      creativeId: undefined,
      tags: [],
    },
  });

  const portfolioMutation = useMutation({
    mutationFn: async (data: PortfolioSubmissionData) => {
      const response = await apiRequest("POST", "/api/portfolio", {
        ...data,
        tags: tags,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Portfolio item submitted!",
        description: "Your work has been submitted for review.",
      });
      form.reset();
      setTags([]);
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit portfolio item. Please try again.",
        variant: "destructive",
      });
      console.error("Portfolio submission error:", error);
    },
  });

  const onSubmit = (data: PortfolioSubmissionData) => {
    portfolioMutation.mutate(data);
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] px-6 py-3 font-semibold hover:scale-105 transition-transform duration-300">
          <Upload className="mr-2" size={20} />
          Submit Your Work
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-dark-secondary border-gray-600 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text font-mono tracking-wider">
            Submit Portfolio Item
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="creativeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Artist Profile</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="bg-dark-tertiary border-gray-600 focus:border-neon-blue">
                        <SelectValue placeholder="Select your profile" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-dark-tertiary border-gray-600">
                      {creatives?.map((creative) => (
                        <SelectItem key={creative.id} value={creative.id.toString()}>
                          {creative.artistName} ({creative.specialty})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter artwork title"
                      className="bg-dark-tertiary border-gray-600 focus:border-neon-blue"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder="Describe your artwork..."
                      className="bg-dark-tertiary border-gray-600 focus:border-neon-blue resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://example.com/image.jpg"
                      className="bg-dark-tertiary border-gray-600 focus:border-neon-blue"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-dark-tertiary border-gray-600 focus:border-neon-blue">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-dark-tertiary border-gray-600">
                        <SelectItem value="Traditional">Traditional</SelectItem>
                        <SelectItem value="Geometric">Geometric</SelectItem>
                        <SelectItem value="Minimalist">Minimalist</SelectItem>
                        <SelectItem value="Realistic">Realistic</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Abstract">Abstract</SelectItem>
                        <SelectItem value="Blackwork">Blackwork</SelectItem>
                        <SelectItem value="Watercolor">Watercolor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Style</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., Dragon, Portrait, Mandala"
                        className="bg-dark-tertiary border-gray-600 focus:border-neon-blue"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tags Section */}
            <div>
              <FormLabel className="text-sm font-semibold">Tags</FormLabel>
              <div className="flex gap-2 mt-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add tags..."
                  className="bg-dark-tertiary border-gray-600 focus:border-neon-blue"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  size="icon"
                  variant="outline"
                  className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black"
                >
                  <Plus size={16} />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-neon-pink border-neon-pink pr-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-400"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={portfolioMutation.isPending}
              className="w-full bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] px-6 py-4 font-semibold hover:scale-105 transition-transform duration-300"
            >
              <Upload className="mr-2" size={20} />
              {portfolioMutation.isPending ? "Submitting..." : "Submit Portfolio Item"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}