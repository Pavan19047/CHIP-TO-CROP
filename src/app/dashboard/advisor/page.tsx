import DataCollectionUploader from '@/components/dashboard/data-collection-uploader';
import ImageComparisonAnalyzer from '@/components/dashboard/image-comparison-analyzer';
import ImageGenerationAnalyzer from '@/components/dashboard/image-generation-analyzer';
import ImageUploadAnalyzer from '@/components/dashboard/image-upload-analyzer';
import LiveCameraAnalyzer from '@/components/dashboard/live-camera-analyzer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdvisorPage() {
  return (
    <div className="space-y-6">
       <div>
            <h2 className="text-2xl font-bold tracking-tight font-headline">AI Advisor</h2>
            <p className="text-muted-foreground">Get insights on sorting errors from our AI analysis tool.</p>
        </div>
        <Tabs defaultValue="file-upload">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-5 h-auto">
            <TabsTrigger value="file-upload">Single Image Analysis</TabsTrigger>
            <TabsTrigger value="live-camera">Live Feed Analysis</TabsTrigger>
            <TabsTrigger value="comparison">Comparison Tool</TabsTrigger>
            <TabsTrigger value="generation">Image Generation</TabsTrigger>
            <TabsTrigger value="data-collection">Data Collection</TabsTrigger>
          </TabsList>
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
