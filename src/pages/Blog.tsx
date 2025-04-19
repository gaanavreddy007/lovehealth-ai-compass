import React from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, User, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Blog = () => {
  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Common Cold vs. Seasonal Allergies in Bengaluru",
      excerpt: "Learn how to differentiate between common cold symptoms and seasonal allergies, especially during Bengaluru's changing seasons.",
      author: "Dr. Priya Sharma",
      date: "April 15, 2025",
      category: "Wellness",
      image: "/blog/cold-vs-allergies.jpg",
      tags: ["Cold", "Allergies", "Seasonal Health"]
    },
    {
      id: 2,
      title: "Ayurvedic Approaches to Managing Digestive Health",
      excerpt: "Explore traditional Ayurvedic remedies and dietary practices that can help improve your digestive health and overall wellbeing.",
      author: "Dr. Arjun Reddy",
      date: "April 10, 2025",
      category: "Ayurveda",
      image: "/blog/ayurvedic-digestion.jpg",
      tags: ["Ayurveda", "Digestion", "Natural Remedies"]
    },
    {
      id: 3,
      title: "Finding the Right Healthcare Provider in Bengaluru: A Comprehensive Guide",
      excerpt: "Navigate Bengaluru's healthcare system with confidence using this guide to finding specialists, hospitals, and clinics that meet your needs.",
      author: "Meera Nair",
      date: "April 5, 2025",
      category: "Healthcare",
      image: "/blog/healthcare-providers.jpg",
      tags: ["Healthcare", "Doctors", "Hospitals"]
    },
    {
      id: 4,
      title: "Monsoon Health: Preventing Common Illnesses During Rainy Season",
      excerpt: "Stay healthy during Bengaluru's monsoon season with these practical tips to prevent common waterborne and vector-borne diseases.",
      author: "Dr. Karthik Kumar",
      date: "March 28, 2025",
      category: "Seasonal Health",
      image: "/blog/monsoon-health.jpg",
      tags: ["Monsoon", "Prevention", "Waterborne Diseases"]
    },
    {
      id: 5,
      title: "Balancing Modern Medicine and Traditional Practices",
      excerpt: "Discover how integrating evidence-based modern medicine with traditional healing practices can provide comprehensive healthcare solutions.",
      author: "Dr. Lakshmi Rao",
      date: "March 20, 2025",
      category: "Integrative Health",
      image: "/blog/integrative-health.jpg",
      tags: ["Integrative Medicine", "Holistic Health", "Wellness"]
    },
    {
      id: 6,
      title: "Mental Health Resources in Bengaluru: Where to Find Help",
      excerpt: "A comprehensive guide to mental health services, counseling centers, and support groups available in Bengaluru.",
      author: "Rahul Menon",
      date: "March 15, 2025",
      category: "Mental Health",
      image: "/blog/mental-health.jpg",
      tags: ["Mental Health", "Counseling", "Support"]
    }
  ];

  // Categories for filter
  const categories = [
    "All Categories",
    "Wellness",
    "Ayurveda",
    "Healthcare",
    "Seasonal Health",
    "Integrative Health",
    "Mental Health"
  ];

  return (
    <AppLayout>
      <div className="ayu-container py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">Health Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore articles on health topics, traditional remedies, and modern healthcare practices relevant to Bengaluru residents.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={index === 0 ? "bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-ayurveda-sage/20 to-ayurveda-terracotta/20 p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-ayurveda-terracotta hover:bg-ayurveda-terracotta/80">Featured</Badge>
              <CardTitle className="text-2xl mb-4">The Importance of Seasonal Eating: An Ayurvedic Perspective</CardTitle>
              <CardDescription className="mb-6 text-base">
                Discover how aligning your diet with the seasons can improve digestion, boost immunity, and enhance overall wellbeing according to Ayurvedic principles.
              </CardDescription>
              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <User className="h-4 w-4 mr-1" />
                <span className="mr-4">Dr. Ananya Desai</span>
                <Calendar className="h-4 w-4 mr-1" />
                <span>April 18, 2025</span>
              </div>
              <Button className="w-fit bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90">
                Read Article
              </Button>
            </div>
            <div className="bg-gray-200 min-h-[300px] flex items-center justify-center">
              <div className="text-muted-foreground">Featured Article Image</div>
            </div>
          </div>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <div className="text-muted-foreground">Article Image</div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-ayurveda-cream/50 text-ayurveda-deepblue hover:bg-ayurveda-cream">
                    {post.category}
                  </Badge>
                  <div className="text-xs text-muted-foreground">{post.date}</div>
                </div>
                <CardTitle className="text-lg">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <p className="text-muted-foreground text-sm">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between items-center">
                <div className="text-xs text-muted-foreground">By {post.author}</div>
                <Button variant="ghost" size="sm" className="text-ayurveda-deepblue hover:text-ayurveda-deepblue/80 p-0">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-ayurveda-deepblue text-white hover:bg-ayurveda-deepblue/90">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-gradient-to-r from-ayurveda-sage/20 to-ayurveda-terracotta/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="relative w-10 h-10 bg-gradient-to-br from-ayurveda-terracotta to-ayurveda-sage rounded-full flex items-center justify-center">
                  <Heart className="text-white h-5 w-5" />
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-ayurveda-deepblue">
                Subscribe to Our Health Newsletter
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Get the latest health tips, wellness advice, and updates on healthcare services in Bengaluru delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input placeholder="Enter your email" className="flex-grow" />
                <Button className="bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Blog;
