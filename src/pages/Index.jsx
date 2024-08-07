import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Info, Paw, Heart, Share2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [likedFacts, setLikedFacts] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const catFacts = [
    "Cats have excellent night vision and can see at one-sixth the light level required for human vision.",
    "A group of cats is called a 'clowder'.",
    "Cats spend 70% of their lives sleeping.",
    "A cat's hearing is much more sensitive than humans and dogs.",
    "Cats have over 20 vocalizations, including the purr, meow, and chirp.",
    "The first cat in space was a French cat named Felicette in 1963.",
  ];

  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive coloring and vocal nature." },
    { name: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance." },
    { name: "Persian", description: "Recognized for their long fur and flat faces." },
    { name: "Bengal", description: "Noted for their wild appearance resembling leopards." },
    { name: "Sphynx", description: "Famous for their lack of fur and wrinkled skin." },
    { name: "Scottish Fold", description: "Characterized by their folded ears and round faces." },
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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 right-4 bg-white bg-opacity-70 p-2 rounded-full"
          >
            <Button variant="ghost" size="icon" onClick={shareContent}>
              <Share2 className="h-6 w-6" />
            </Button>
          </motion.div>
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
                      className="flex items-center justify-between"
                    >
                      <span>{fact}</span>
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
                    >
                      <strong>{breed.name}:</strong> {breed.description}
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
