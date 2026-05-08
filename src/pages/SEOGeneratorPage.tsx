import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Copy, CheckCircle, Globe, Tag, FileText, Image, Link2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function SEOGeneratorPage() {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generate = async () => {
    if (!topic.trim()) {
      toast({ title: "Enter a topic", description: "Please describe your page or topic.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("travel-assistant", {
        body: {
          messages: [
            {
              role: "user",
              content: `Generate SEO metadata for a travel page about: "${topic}". ${url ? `URL: ${url}` : ""}
              
Return ONLY a JSON object (no markdown, no explanation) with these fields:
{
  "title": "SEO title under 60 chars with primary keyword",
  "description": "Meta description under 160 chars, compelling with CTA",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "og_title": "Open Graph title for social sharing",
  "og_description": "Open Graph description for social sharing",
  "h1": "Primary H1 heading for the page",
  "alt_text": "Image alt text suggestion",
  "schema_type": "Article or TouristAttraction or TravelAction or Product",
  "canonical_slug": "suggested-url-slug"
}`
            }
          ]
        }
      });
      if (error) throw error;
      const reply = data?.reply || "";
      // Try to parse JSON from the response
      const jsonMatch = reply.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setResult(JSON.parse(jsonMatch[0]));
      } else {
        throw new Error("Could not parse SEO data");
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate SEO data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied!` });
  };

  const copyAllAsHTML = () => {
    if (!result) return;
    const html = `<title>${result.title}</title>
<meta name="description" content="${result.description}" />
<meta name="keywords" content="${result.keywords?.join(", ")}" />
<meta property="og:title" content="${result.og_title}" />
<meta property="og:description" content="${result.og_description}" />
<link rel="canonical" href="/${result.canonical_slug}" />`;
    navigator.clipboard.writeText(html);
    toast({ title: "All meta tags copied as HTML!" });
  };

  return (
    <div>
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">SEO Meta Tags Generator</h1>
          <p className="text-primary-foreground/80">Generate optimized meta tags, keywords, and schema markup for your travel pages using AI.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Search className="w-5 h-5" /> Generate SEO Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Page Topic / Description *</label>
                <Textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., Gorilla trekking in Bwindi Impenetrable Forest Uganda" rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Page URL (optional)</label>
                <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://zulatravels.com/packages/gorilla-trekking" />
              </div>
              <Button onClick={generate} disabled={loading} className="w-full sm:w-auto">
                {loading ? <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" /> : <Search className="w-4 h-4 mr-2" />}
                {loading ? "Generating..." : "Generate SEO Tags"}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-display font-semibold">Generated SEO Data</h2>
                <Button variant="outline" size="sm" onClick={copyAllAsHTML}><Copy className="w-4 h-4 mr-1" /> Copy All as HTML</Button>
              </div>

              <div className="grid gap-4">
                {[
                  { icon: FileText, label: "Title Tag", value: result.title, charLimit: 60 },
                  { icon: Globe, label: "Meta Description", value: result.description, charLimit: 160 },
                  { icon: FileText, label: "H1 Heading", value: result.h1 },
                  { icon: Link2, label: "OG Title", value: result.og_title },
                  { icon: Link2, label: "OG Description", value: result.og_description },
                  { icon: Image, label: "Image Alt Text", value: result.alt_text },
                  { icon: Globe, label: "Canonical Slug", value: `/${result.canonical_slug}` },
                  { icon: Tag, label: "Schema Type", value: result.schema_type },
                ].map((item) => (
                  <Card key={item.label}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <item.icon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                            {item.charLimit && (
                              <Badge variant={String(item.value || "").length <= item.charLimit ? "default" : "destructive"} className="text-xs">
                                {String(item.value || "").length}/{item.charLimit}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm">{item.value}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="shrink-0" onClick={() => copyToClipboard(String(item.value), item.label)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {result.keywords && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">Keywords</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.keywords.map((kw: string, i: number) => (
                          <Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => copyToClipboard(kw, "Keyword")}>
                            {kw}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(result.keywords.join(", "), "All keywords")}>
                        <Copy className="w-3 h-3 mr-1" /> Copy all keywords
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Preview */}
              <Card className="mt-6">
                <CardHeader><CardTitle className="text-base">Google Search Preview</CardTitle></CardHeader>
                <CardContent>
                  <div className="bg-background border border-border rounded-lg p-4 max-w-xl">
                    <p className="text-primary text-lg font-medium leading-snug hover:underline cursor-pointer">{result.title}</p>
                    <p className="text-xs text-[hsl(120,70%,30%)] mt-1">zulatravels.com › {result.canonical_slug}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{result.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
