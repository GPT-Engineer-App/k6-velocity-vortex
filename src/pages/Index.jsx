import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Info, Paw, Heart, Share2, ChevronLeft, ChevronRight, Instagram, Twitter, Facebook } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Index = () => {
  const [likedFacts, setLikedFacts] = useState(new Set());
  const [autoPlay, setAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const [catCount, setCatCount] = useState(0);
  const targetCatCount = 600000000; // Estimated number of domestic cats worldwide
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCatCount(prevCount => {
        const increment = Math.floor(Math.random() * 1000000) + 500000;
        return Math.min(prevCount + increment, targetCatCount);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <motion.div 
        ref={headerRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-7xl font-bold text-center text-purple-800 z-10"
        >
          Fascinating Felines
        </motion.h1>
        <motion.img 
          src={catImages[0]} 
          alt="Background cat"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ scale: useTransform(scrollYProgress, [0, 1], [1.1, 1]) }}
        />
      </motion.div>
      
      <div className="max-w-4xl mx-auto p-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold mb-8 text-center text-purple-800"
        >
          Estimated Cats Worldwide: {catCount.toLocaleString()}
        </motion.div>

        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((image, index) => (
              <CarouselItem key={index}>
                <img src={image} alt={`Cat ${index + 1}`} className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

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
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                      whileHover={{ scale: 1.02, backgroundColor: "#f0f0f0" }}
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
                      className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                      whileHover={{ scale: 1.02, backgroundColor: "#f0f0f0" }}
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
      
      <footer className="bg-purple-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Connect with Fascinating Felines</h2>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Instagram className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Facebook className="h-6 w-6" />
            </Button>
          </div>
          <p className="mt-4 text-center">© 2024 Fascinating Felines. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
