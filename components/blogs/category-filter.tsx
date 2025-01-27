"use client"

import { Category } from "@/types/blogs"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

interface CategoryFilterProps {
    categories: Category[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    return (
        <div className="rounded-lg border bg-card p-4">
            <h2 className="mb-4 text-lg font-semibold">Categories</h2>
            <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                    <Button
                        variant={selectedCategory === null ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(null)}
                    >
                        All Posts
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.slug ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setSelectedCategory(category.slug)}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

