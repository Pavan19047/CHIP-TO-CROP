import DataCollectionUploader from '@/components/dashboard/data-collection-uploader';
import ImageComparisonAnalyzer from '@/components/dashboard/image-comparison-analyzer';
import ImageGenerationAnalyzer from '@/components/dashboard/image-generation-analyzer';
import ImageUploadAnalyzer from '@/components/dashboard/image-upload-analyzer';
import LiveCameraAnalyzer from '@/components/dashboard/live-camera-analyzer';
import { AIAdvisor } from '@/components/dashboard/ai-advisor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdvisorPage() {
  return (
    <div className="space-y-6">
       <div>
            <h2 className="text-2xl font-bold tracking-tight font-headline">AI Advisor</h2>
            <p className="text-muted-foreground">Get insights and answers to your questions with AI-powered assistance.</p>
        </div>
        <Tabs defaultValue="chat-advisor">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
            <TabsTrigger value="chat-advisor">Chat Advisor</TabsTrigger>
            <TabsTrigger value="file-upload">Single Image Analysis</TabsTrigger>
            <TabsTrigger value="live-camera">Live Feed Analysis</TabsTrigger>
            <TabsTrigger value="comparison">Comparison Tool</TabsTrigger>
            <TabsTrigger value="generation">Image Generation</TabsTrigger>
            <TabsTrigger value="data-collection">Data Collection</TabsTrigger>
          </TabsList>
          <TabsContent value="chat-advisor" className="mt-6">
            <AIAdvisor />
          </TabsContent>
          <TabsContent value="file-upload">
            <ImageUploadAnalyzer />
          </TabsContent>
          <TabsContent value="live-camera">
            <LiveCameraAnalyzer />
          </TabsContent>
           <TabsContent value="comparison">
            <ImageComparisonAnalyzer />
          </TabsContent>
           <TabsContent value="generation">
            <ImageGenerationAnalyzer />
          </TabsContent>
          <TabsContent value="data-collection">
            <DataCollectionUploader />
          </TabsContent>
        </Tabs>
    </div>
  );
}
