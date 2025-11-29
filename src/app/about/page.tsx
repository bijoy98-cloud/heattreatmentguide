
import { AppLayout } from "@/components/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Info,
  FileText,
  Shield,
  FileX,
  Mail,
  Building,
  Users,
  Target,
  User,
  Phone,
  Youtube,
  Linkedin,
  Award,
  BookOpen,
  Cpu,
  Calculator,
  List,
  Sparkles,
  Wrench,
  ScanSearch,
  BookCopy,
  Layers,
  GraduationCap,
  HardHat,
  Bot,
  Database,
  ListChecks,
  Briefcase,
  BadgeCheck,
  BarChart,
  GanttChartSquare,
} from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us - Heat Treatment Guide",
  description:
    "Learn more about the Heat Treatment Guide, our policies, and how to contact us.",
};

export default function AboutPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <Info className="h-8 w-8 text-primary" />
            About Us
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground text-justify">
            Information about our company, policies, and contact details.
          </p>
        </div>

        <Tabs defaultValue="about-us" className="w-full">
          <TabsList className="h-auto justify-start flex-wrap">
            <TabsTrigger value="about-us">About Us</TabsTrigger>
            <TabsTrigger value="user-manual">User Manual</TabsTrigger>
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="cancellation">Cancellation</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>

          <TabsContent value="about-us">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Building className="h-6 w-6 text-primary" /> About Our
                  Company
                </CardTitle>
                <CardDescription>
                  Pioneering innovation in the heat treatment industry.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground">
                <p className="text-justify">
                  Welcome to Heat Treatment Guide, your premier digital resource
                  for everything related to the science and art of treating
                  metals. Founded by a team of passionate metallurgists and
                  engineers, our mission is to democratize knowledge and provide
                  cutting-edge tools for professionals, students, and hobbyists
                  in the industry.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground">
                      <Target className="h-5 w-5 text-primary" /> Our Mission
                    </h3>
                    <p className="text-justify">
                      Our mission is to empower the next generation of
                      metallurgical experts by providing accessible, accurate,
                      and practical information. We leverage AI and modern web
                      technologies to create tools that simplify complex
                      processes, enhance safety, and drive innovation.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground">
                      <Users className="h-5 w-5 text-primary" /> Our Team
                    </h3>
                    <p className="text-justify">
                      Our team comprises industry veterans with decades of
                      hands-on experience in heat treatment, quality assurance,
                      and process control. We are dedicated to creating a
                      platform that not only educates but also serves as a
                      practical tool in the daily workflow of a heat treat
                      professional.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-manual">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" /> User Manual
                </CardTitle>
                <CardDescription className="text-justify">
                  A detailed "A to Z" guide to navigating and using the Heat Treatment Guide application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground">
                <p className="text-justify">
                  Welcome to the Heat Treatment Guide! This application is designed to be your comprehensive digital assistant for steel heat treatment. Below is a detailed guide to its key features to help you get the most out of the platform.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                      <Cpu className="h-5 w-5 text-primary" /> A: AI-Powered Tools
                    </h3>
                    <p className="mb-4 text-justify">
                      Our app's most powerful features are driven by artificial intelligence, designed to act as your expert consultant. You can find these under the <span className="font-semibold text-foreground">"AI Features"</span> page from the main navigation menu.
                    </p>
                    <div className="space-y-4 pl-4 border-l-2 border-primary">
                        <div className="flex items-start gap-3">
                            <Sparkles className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Material Suggestion</h4>
                                <p className="text-sm text-justify">Enter a steel grade and describe the mechanical properties you want to achieve (e.g., "high hardness for wear resistance"). The AI will suggest an appropriate heat treatment process, including temperature and duration.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Wrench className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">AI Fault Diagnosis</h4>
                                <p className="text-sm text-justify">If you encounter a problem like unexpected distortion, cracking, or soft spots, describe the symptoms in detail. The AI will analyze the problem and provide a list of likely causes and actionable corrective steps.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <ScanSearch className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Image Analyzer</h4>
                                <p className="text-sm text-justify">Upload a clear micrograph of a polished and etched steel sample. The AI will analyze the image to predict the phase composition (e.g., % martensite, % ferrite) and provide an estimated hardness range (e.g., 58-62 HRC).</p>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                      <Calculator className="h-5 w-5 text-primary" /> B: Calculators for Every Need
                    </h3>
                    <p className="mb-4 text-justify">We offer two distinct calculators to assist with process planning, accessible from the navigation menu.</p>
                     <div className="space-y-4 pl-4 border-l-2 border-primary">
                        <div className="flex items-start gap-3">
                            <Calculator className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Process Parameter Calculator</h4>
                                <p className="text-sm text-justify">This is a quick, rule-based calculator. Select a steel grade and a standard process (like Annealing or Hardening) to get immediate, formula-driven recommendations for temperature, soak time, and cooling method.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Bot className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Hardness-Based AI Calculator</h4>
                                <p className="text-sm text-justify">A more advanced tool. Input your steel type, part thickness, and desired final hardness (e.g., "58 HRC"). The AI will generate a complete, multi-step heat treatment plan, including a temperature-vs-time graph, to achieve your specific target.</p>
                            </div>
                        </div>
                    </div>
                  </div>
                   <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                      <HardHat className="h-5 w-5 text-primary" /> C: Safety & Compliance
                    </h3>
                    <p className="mb-4 text-justify">Safety is paramount. We provide tools and guides to help maintain a safe working environment.</p>
                     <div className="space-y-4 pl-4 border-l-2 border-primary">
                        <div className="flex items-start gap-3">
                            <Shield className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Industrial Safety Guide</h4>
                                <p className="text-sm text-justify">A comprehensive guide covering essential safety topics like Personal Protective Equipment (PPE), furnace safety, and emergency procedures.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                             <ListChecks className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Hazard Identification Tool</h4>
                                <p className="text-sm text-justify">An interactive checklist to help you identify and mitigate potential hazards in the heat treatment area, covering furnaces, quenching, chemicals, and more.</p>
                            </div>
                        </div>
                     </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                      <BookCopy className="h-5 w-5 text-primary" /> D: Data & Reference Materials
                    </h3>
                    <p className="mb-4 text-justify">Our application is a rich library of metallurgical knowledge. Use these sections to look up critical information.</p>
                     <div className="space-y-4 pl-4 border-l-2 border-primary">
                        <div className="flex items-start gap-3">
                            <Database className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Alloy Database</h4>
                                <p className="text-sm text-justify">A searchable database of common steel alloys. Look up grades to find their composition, hardenability, and a direct link to calculate process parameters.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <List className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Glossary of Terms</h4>
                                <p className="text-sm text-justify">A comprehensive, searchable dictionary of metallurgical and heat treatment terminology. Quickly look up definitions for everything from "Austenite" to "Quenching".</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Briefcase className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Industrial Tools & References</h4>
                                <p className="text-sm text-justify">A suite of practical utilities, including a temperature converter, thermocouple guide, furnace library, and troubleshooting tips for common heat treatment issues.</p>
                            </div>
                        </div>
                     </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                      <Layers className="h-5 w-5 text-primary" /> E: Process Guides
                    </h3>
                    <p className="mb-4 text-justify">Explore detailed explanations of fundamental and advanced heat treatment processes.</p>
                     <div className="space-y-4 pl-4 border-l-2 border-primary">
                        <div className="flex items-start gap-3">
                           <BookOpen className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Process Explanations</h4>
                                <p className="text-sm text-justify">Detailed breakdowns of core processes like Annealing, Normalizing, Quenching, and Tempering, explaining the purpose and steps for each.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Sparkles className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Special Processes</h4>
                                <p className="text-sm text-justify">In-depth guides on case-hardening and joining processes, including Carburizing, Nitriding, and Brazing, complete with calculators and diagrams.</p>
                            </div>
                        </div>
                     </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                      <BadgeCheck className="h-5 w-5 text-primary" /> F: Quality & Management
                    </h3>
                    <p className="mb-4 text-justify">Tools and information related to maintaining high standards of quality and managing operations effectively.</p>
                     <div className="space-y-4 pl-4 border-l-2 border-primary">
                        <div className="flex items-start gap-3">
                           <BadgeCheck className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Quality Assurance</h4>
                                <p className="text-sm text-justify">Learn about mechanical testing, metallographic analysis, and how to perform failure analysis. This section includes a Hardness Converter and an Effective Case Depth calculator.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <GanttChartSquare className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Management System</h4>
                                <p className="text-sm text-justify">Understand the organizational structure of a heat treatment facility, the typical process flow, and key industry standards like AMS 2750 and CQI-9.</p>
                            </div>
                        </div>
                     </div>
                  </div>
                   <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground mb-2">
                      <GraduationCap className="h-5 w-5 text-primary" /> G: Skill Development & Learning
                    </h3>
                    <p className="text-justify">Continuously improve your expertise with our curated learning resources and connect with the global community.</p>
                     <div className="space-y-4 pl-4 border-l-2 border-primary">
                        <div className="flex items-start gap-3">
                           <Youtube className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Skill Development Page</h4>
                                <p className="text-sm text-justify">This page features a curated library of video tutorials covering everything from fundamentals to advanced topics like sub-zero treatments and failure analysis.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <BookOpen className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Course Program & Quizzes</h4>
                                <p className="text-sm text-justify">Follow our structured 45-day course program that takes you from beginner to advanced topics. Test your knowledge with integrated quizzes to track your progress and solidify your learning.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Users className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <h4 className="font-medium text-foreground">Community Network</h4>
                                <p className="text-sm text-justify">Discover and connect with major heat treatment societies, research institutes, and online forums like the ASM Heat Treating Society and the Global Heat Treatment Network.</p>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" /> Terms of
                  Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground text-justify">
                <p>
                  By accessing or using the Heat Treatment Guide, you agree to
                  be bound by these terms. The information and tools provided
                  are for educational and informational purposes only. They are
                  not a substitute for professional engineering advice, testing,
                  or validation.
                </p>
                <p>
                  You agree not to use the service for any unlawful purpose. We
                  reserve the right to terminate or suspend access to our
                  service for any user who violates these terms.
                </p>
                <p>
                  The content, including AI-generated suggestions, is provided
                  "as is" without warranties of any kind. Always verify critical
                  process parameters with official documentation and expert
                  consultation.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" /> Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground text-justify">
                <p>
                  We collect information you provide, such as your email address
                  when you create an account. We use this information to provide
                  and improve our services.
                </p>
                <p>
                  We do not sell or share your personal data with third parties
                  for marketing purposes. Data from AI tools may be used
                  anonymously to improve our models.
                </p>
                <p>
                  We use cookies and similar technologies to maintain your
                  session and understand how you use our service. You can control
                  the use of cookies at the individual browser level.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cancellation">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileX className="h-6 w-6 text-primary" /> Cancellation
                  Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground text-justify">
                <p>
                  You can cancel your subscription at any time from your
                  account settings. Your access to paid features will continue
                  until the end of your current billing period.
                </p>
                <p>
                  We do not offer refunds for partial-month subscriptions or
                  unused time. Once a payment is made, it is non-refundable.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-primary" /> Contact Us
                </CardTitle>
                <CardDescription className="text-justify">
                  Have a question or feedback? Reach out directly or fill out
                  the form below and we'll get back to you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4 rounded-lg border bg-muted/50 p-4">
                  <h3 className="font-semibold">Contact Information</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Bijoy Saha</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#25D366"
                        className="h-4 w-4"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.902-.539-5.586-1.54l-6.332 1.677zM6.638 19.324l.441.259c1.518.892 3.21 1.365 4.953 1.366 5.462 0 9.89-4.428 9.891-9.891s-4.428-9.89-9.89-9.89c-5.463 0-9.891 4.428-9.891 9.891 0 2.01.589 3.94 1.696 5.613l.281.423-1.093 3.992 4.07-1.077z" />
                      </svg>
                      <a href="https://wa.me/880197205750" target="_blank" rel="noopener noreferrer" className="hover:underline">
                        <span>+880197205750</span>
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href="mailto:bijoy98@gmail.com" className="hover:underline">bijoy98@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href="https://www.youtube.com/channel/UCaoJ6eqgXqawJ9hfEn43Bag" target="_blank">
                          <Youtube className="h-4 w-4 text-red-600" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href="https://www.facebook.com/HeatTreatmentTraining/" target="_blank">
                          <svg className="h-4 w-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href="https://www.linkedin.com/in/bijoy-saha-bijoy98" target="_blank">
                          <Linkedin className="h-4 w-4 text-[#0077B5]" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="https://drive.google.com/file/d/1iLFZOkERcfT6hkmIOnHVFJ556ntE6r-u/view?usp=drive_link" target="_blank">
                           <Award className="mr-2 h-4 w-4" />
                          View Certificate
                        </Link>
                      </Button>
                  </div>
                </div>
                <ContactForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
