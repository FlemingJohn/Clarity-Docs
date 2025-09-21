
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ShieldCheck, Scale, Milestone, Code, Languages, BrainCircuit, ScanText, Search, Bot, Home, Briefcase, Landmark, Upload, Sparkles, Clock, MessageCircle, Target, CheckCircle, ArrowRight, Zap, Eye, Brain, Calendar, Users, FileCheck, TrendingUp, Award } from 'lucide-react';
import HeroActions from '@/components/layout/hero-actions';
import Footer from '@/components/layout/footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import cover from '@/images/cover.png';
import logo from '@/images/logo.png';


export default function LandingPage() {
  return (
    <>
      <main className="flex-1 w-full bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-background/80 to-primary/5">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center rounded-full border px-6 py-2 text-sm font-medium bg-background/50 backdrop-blur-sm">
                    AI-Powered Document Analysis
                  </div>
                  
                  <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    Understand
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-blue-600">
                      Any Document
                    </span>
                    <span className="block">Instantly</span>
                  </h1>
                  
                  <p className="text-xl md:text-1xl text-muted-foreground font-light leading-relaxed max-w-[580px]">
                    Transform complex legal documents into clear insights with AI-powered analysis, risk scoring, and negotiation tips.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <HeroActions />
                </div>
                </div>
                
                
               
              </div>
              
              {/* Right Content - Cover Image */}
              <div className="relative lg:ml-8">
                <div className="relative">
                  {/* Floating Elements */}
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-primary/20 rounded-2xl blur-xl"></div>
                  
                  {/* Main Image Container */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-gradient-to-br from-background to-secondary/30 p-2">
                    <Image
                      src={cover}
                      alt="ClarityDocs Dashboard"
                      className="w-full h-auto rounded-2xl"
                      priority
                    />
                  </div>
                  
             
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/10 to-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/3 to-transparent rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Powerful Features
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Your Complete Document
                <span className="text-primary"> Analysis Suite</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Transform any document into actionable insights with our comprehensive AI-powered analysis tools. 
                From risk assessment to negotiation strategies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Feature Card 1 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">AI-Powered Summaries</CardTitle>
                  <CardDescription>
                    Get instant plain-language summaries with key points, do's and don'ts clearly highlighted.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Structured key points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Legal term definitions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Actionable recommendations</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature Card 2 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Smart Risk Analysis</CardTitle>
                  <CardDescription>
                    Get comprehensive risk scores with visual breakdowns and tone analysis of key clauses.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>0-100 risk scoring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Positive/negative factors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Tone analysis</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature Card 3 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Interactive Timeline</CardTitle>
                  <CardDescription>
                    Visualize key dates, deadlines, and milestones with our smart timeline extraction.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Automatic date extraction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Visual timeline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Deadline reminders</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature Card 4 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">What-If Scenarios</CardTitle>
                  <CardDescription>
                    Ask questions about your document and get AI-powered answers to understand implications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Interactive Q&A</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Scenario analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Smart suggestions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature Card 5 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Negotiation Help</CardTitle>
                  <CardDescription>
                    Get strategic talking points and suggestions to negotiate better terms confidently.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Strategic suggestions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Polite talking points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Better terms advice</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature Card 6 */}
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Languages className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Multi-Language Support</CardTitle>
                  <CardDescription>
                    Translate summaries into multiple languages including Hindi, Tamil, Telugu, and Malayalam.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Multiple languages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Instant translation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Localized content</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-secondary/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="px-4 py-2">
                <Target className="w-4 h-4 mr-2" />
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Get Clarity in
                <span className="text-primary"> 3 Simple Steps</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our intuitive process transforms complex documents into clear, actionable insights in minutes, not hours.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="relative">
                <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-b from-card to-card/50">
                  <CardHeader className="pb-6">
                    <div className="relative mx-auto w-20 h-20 mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center shadow-lg">
                        <Upload className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">Upload or Paste</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      Securely upload PDF files, images, or paste text directly. Our AI supports multiple formats with advanced OCR.
                    </p>
                    <div className="flex justify-center gap-2">
                      <Badge variant="secondary" className="text-xs">PDF</Badge>
                      <Badge variant="secondary" className="text-xs">Images</Badge>
                      <Badge variant="secondary" className="text-xs">Text</Badge>
                    </div>
                  </CardContent>
                </Card>
                {/* Connection Line */}
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 transform -translate-y-1/2"></div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-b from-card to-card/50">
                  <CardHeader className="pb-6">
                    <div className="relative mx-auto w-20 h-20 mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Brain className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">AI Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      Our advanced AI analyzes your document, generating summaries, risk scores, timelines, and insights instantly.
                    </p>
                    <div className="flex justify-center gap-2">
                      <Badge variant="secondary" className="text-xs">Gemini AI</Badge>
                      <Badge variant="secondary" className="text-xs">Fast</Badge>
                      <Badge variant="secondary" className="text-xs">Accurate</Badge>
                    </div>
                  </CardContent>
                </Card>
                {/* Connection Line */}
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 transform -translate-y-1/2"></div>
              </div>

              {/* Step 3 */}
              <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-b from-card to-card/50">
                <CardHeader className="pb-6">
                  <div className="relative mx-auto w-20 h-20 mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Eye className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">Explore & Understand</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    Interact with your analysis, ask questions, explore timelines, and get negotiation tips to make informed decisions.
                  </p>
                  <div className="flex justify-center gap-2">
                    <Badge variant="secondary" className="text-xs">Interactive</Badge>
                    <Badge variant="secondary" className="text-xs">Q&A</Badge>
                    <Badge variant="secondary" className="text-xs">Tips</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

     
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-secondary/5 to-primary/5">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Use Cases
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Perfect for
                <span className="text-primary"> Any Agreement</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From rental agreements to employment contracts, ClarityDocs helps you understand life's most important documents.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Use Case 1 */}
              <Card className="group hover:shadow-xl transition-all duration-300 text-center border-2 hover:border-primary/20 bg-gradient-to-b from-card to-card/50">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">Rental Agreements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Understand lease terms, security deposits, maintenance duties, and renewal conditions.
                  </p>
                </CardContent>
              </Card>

              {/* Use Case 2 */}
              <Card className="group hover:shadow-xl transition-all duration-300 text-center border-2 hover:border-primary/20 bg-gradient-to-b from-card to-card/50">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">Employment Contracts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Review job offers, salary details, notice periods, and non-compete clauses.
                  </p>
                </CardContent>
              </Card>

              {/* Use Case 3 */}
              <Card className="group hover:shadow-xl transition-all duration-300 text-center border-2 hover:border-primary/20 bg-gradient-to-b from-card to-card/50">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Landmark className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">Loan Agreements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Analyze interest rates, repayment schedules, and prepayment penalties.
                  </p>
                </CardContent>
              </Card>

              {/* Use Case 4 */}
              <Card className="group hover:shadow-xl transition-all duration-300 text-center border-2 hover:border-primary/20 bg-gradient-to-b from-card to-card/50">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">Terms of Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Decode privacy policies, data usage terms, and service agreements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>



        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-12 px-4 md:px-6">
            <div className="space-y-4 text-center">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Powered by Google</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Built with Cutting-Edge AI
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ClarityDocs leverages Google's state-of-the-art cloud and AI infrastructure to provide a fast, secure, and intelligent experience.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                      <Code className="w-8 h-8" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <CardTitle className="text-lg">Firebase Studio</CardTitle>
                  <p className="text-sm text-muted-foreground">App Development</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                      <ScanText className="w-8 h-8" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <CardTitle className="text-lg">Document AI</CardTitle>
                  <p className="text-sm text-muted-foreground">Text Extraction</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                      <BrainCircuit className="w-8 h-8" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <CardTitle className="text-lg">Gemini API</CardTitle>
                  <p className="text-sm text-muted-foreground">Reasoning & Analysis</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                      <Languages className="w-8 h-8" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <CardTitle className="text-lg">Cloud Translation</CardTitle>
                  <p className="text-sm text-muted-foreground">Language Support</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container max-w-3xl px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">FAQ</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions? We've got answers. Here are some common things to know.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes. We take data security very seriously. Your documents are processed securely and are not stored on our servers after the analysis is complete. All connections are encrypted.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What file types does ClarityDocs support?</AccordionTrigger>
                <AccordionContent>
                  You can upload most common document and image formats, including PDF, JPG, PNG, and TIFF. You can also paste text directly into the application.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I use this for languages other than English?</AccordionTrigger>
                <AccordionContent>
                  Currently, ClarityDocs works best with English documents. However, you can translate the analysis results into multiple languages including Hindi, Tamil, Telugu, and Malayalam.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How accurate is the AI analysis?</AccordionTrigger>
                <AccordionContent>
                  Our AI achieves over 95% accuracy in document analysis by using Google's state-of-the-art Gemini AI. However, for critical decisions, we always recommend consulting with a qualified professional.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Is there a free tier?</AccordionTrigger>
                <AccordionContent>
                  Yes! You can analyze documents for free with some limitations. Sign up to get started and explore all the features ClarityDocs has to offer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

      </main>
      
      <Footer />
    </>
  );
}
