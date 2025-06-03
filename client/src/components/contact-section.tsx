import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, Clock, Send, Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema } from "@shared/schema";

const contactFormSchema = insertContactMessageSchema;

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-dark-primary">
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-3xl md:text-5xl text-center mb-16 gradient-text font-mono tracking-wider">
          GET IN TOUCH
        </h2>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-2xl mb-8 text-neon-blue font-mono tracking-wider">
              Let's Create Together
            </h3>
            <p className="text-gray-300 mb-8">
              Ready to bring your vision to life? Get in touch with us for custom designs, printing services, or just to chat about your next creative project.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] rounded-full flex items-center justify-center">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-gray-300">+1 (555) 123-4567</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[hsl(var(--neon-pink))] to-[hsl(var(--neon-purple))] rounded-full flex items-center justify-center">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-gray-300">hello@wearecreatives.com</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-blue))] rounded-full flex items-center justify-center">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold">Hours</div>
                  <div className="text-gray-300">Mon - Sat: 10AM - 8PM</div>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="mt-12">
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 bg-dark-tertiary border-gray-600 rounded-full hover:bg-neon-blue hover:scale-110 transition-all duration-300"
                >
                  <Instagram size={20} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 bg-dark-tertiary border-gray-600 rounded-full hover:bg-neon-pink hover:scale-110 transition-all duration-300"
                >
                  <SiTiktok size={20} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 bg-dark-tertiary border-gray-600 rounded-full hover:bg-neon-purple hover:scale-110 transition-all duration-300"
                >
                  <Youtube size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="glass-effect rounded-xl p-8">
            <h3 className="font-bold text-xl mb-6 text-center font-mono tracking-wider">
              Send Us a Message
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-dark-tertiary border-gray-600 focus:border-neon-blue"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-dark-tertiary border-gray-600 focus:border-neon-blue"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="bg-dark-tertiary border-gray-600 focus:border-neon-blue"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Service Interest</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-dark-tertiary border-gray-600 focus:border-neon-blue">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-dark-tertiary border-gray-600">
                          <SelectItem value="Custom Design">Custom Design</SelectItem>
                          <SelectItem value="Flash Sheets">Flash Sheets</SelectItem>
                          <SelectItem value="Printing Service">Printing Service</SelectItem>
                          <SelectItem value="Consultation">Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Tell us about your project..."
                          className="bg-dark-tertiary border-gray-600 focus:border-neon-blue resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] px-6 py-4 font-semibold hover:scale-105 transition-transform duration-300"
                >
                  <Send className="mr-2" size={20} />
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
