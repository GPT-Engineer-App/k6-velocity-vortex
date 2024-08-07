import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Info, Paw, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [likedFacts, setLikedFacts] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const toggleLike = (fact) => {
    setLikedFacts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fact)) {
        newSet.delete(fact);
        toast({
          title: "Unliked!",
          description: "You've removed this fact from your favorites.",
        });
      } else {
        newSet.add(fact);
        toast({
          title: "Liked!",
          description: "You've added this fact to your favorites.",
        });
      }
      return newSet;
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    setProgress(0);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + catImages.length) % catImages.length);
    setProgress(0);
  };

  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Fascinating Felines',
        text: 'Check out these amazing cat facts!',
        url: window.location.href,
      }).then(() => {
        toast({
          title: "Shared successfully!",
          description: "Thanks for spreading the cat love!",
        });
      }).catch(console.error);
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support sharing.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            nextImage();
            return 0;
          }
          return prevProgress + 1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [autoPlay]);

  const catFacts = [
    "Cats have excellent night vision and can see at one-sixth the light level required for human vision.",
    "A group of cats is called a 'clowder'.",
    "Cats spend 70% of their lives sleeping.",
    "A cat's hearing is much more sensitive than humans and dogs.",
    "Cats have over 20 vocalizations, including the purr, meow, and chirp.",
    "The first cat in space was a French cat named Felicette in 1963.",
  ];

  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive coloring and vocal nature.", origin: "Thailand" },
    { name: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance.", origin: "United States" },
    { name: "Persian", description: "Recognized for their long fur and flat faces.", origin: "Iran" },
    { name: "Bengal", description: "Noted for their wild appearance resembling leopards.", origin: "United States" },
    { name: "Sphynx", description: "Famous for their lack of fur and wrinkled skin.", origin: "Canada" },
    { name: "Scottish Fold", description: "Characterized by their folded ears and round faces.", origin: "Scotland" },
  ];

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-8 text-center text-purple-800"
      >
        Fascinating Felines
      </motion.h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-8">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={catImages[currentImageIndex]}
              alt="Cute cat" 
              className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg"
            />
          </AnimatePresence>
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button variant="outline" size="icon" onClick={prevImage} className="rounded-full bg-white bg-opacity-50 hover:bg-opacity-75">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextImage} className="rounded-full bg-white bg-opacity-50 hover:bg-opacity-75">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-2">
            <Progress value={progress} className="flex-grow" />
            <Button variant="outline" size="sm" onClick={() => setAutoPlay(!autoPlay)} className="bg-white bg-opacity-70">
              {autoPlay ? "Pause" : "Play"}
            </Button>
            <Button variant="ghost" size="icon" onClick={shareContent} className="bg-white bg-opacity-70">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <Alert className="mb-8">
          <Heart className="h-4 w-4" />
          <AlertTitle>Did you know?</AlertTitle>
          <AlertDescription>
            Cats have been domesticated for over 4,000 years!
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="facts" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="facts">Feline Facts</TabsTrigger>
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="facts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Info className="mr-2" /> Feline Facts</CardTitle>
                <CardDescription>Interesting tidbits about our furry friends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {catFacts.map((fact, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="flex-grow mr-4">{fact}</span>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleLike(fact)}
                          className={likedFacts.has(fact) ? "text-red-500" : ""}
                        >
                          <Paw className={`h-4 w-4 ${likedFacts.has(fact) ? "fill-current" : ""}`} />
                        </Button>
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Cat className="mr-2" /> Popular Cat Breeds</CardTitle>
                <CardDescription>Some well-known feline varieties</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {catBreeds.map((breed, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <strong className="text-lg">{breed.name}</strong>
                        <Badge variant="secondary">{breed.origin}</Badge>
                      </div>
                      <p>{breed.description}</p>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
