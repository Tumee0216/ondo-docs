"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateAnchor } from "@/lib/utils"

export default function TestPage() {
  const [testResults, setTestResults] = useState<string[]>([])

  const runTests = () => {
    const results: string[] = []
    
    // Test 1: Basic anchor generation
    try {
      const anchor1 = generateAnchor("Hello World", 1)
      results.push(`✅ Basic anchor: "Hello World" -> "${anchor1}"`)
    } catch (error) {
      results.push(`❌ Basic anchor failed: ${error}`)
    }

    // Test 2: Special characters
    try {
      const anchor2 = generateAnchor("Test & Special @ Characters!", 2)
      results.push(`✅ Special chars: "Test & Special @ Characters!" -> "${anchor2}"`)
    } catch (error) {
      results.push(`❌ Special chars failed: ${error}`)
    }

    // Test 3: Multiple spaces
    try {
      const anchor3 = generateAnchor("Multiple    Spaces", 3)
      results.push(`✅ Multiple spaces: "Multiple    Spaces" -> "${anchor3}"`)
    } catch (error) {
      results.push(`❌ Multiple spaces failed: ${error}`)
    }

    // Test 4: Empty string
    try {
      const anchor4 = generateAnchor("", 4)
      results.push(`✅ Empty string: "" -> "${anchor4}"`)
    } catch (error) {
      results.push(`❌ Empty string failed: ${error}`)
    }

    // Test 5: Numbers and hyphens
    try {
      const anchor5 = generateAnchor("Version 2.0 - Release Notes", 5)
      results.push(`✅ Numbers and hyphens: "Version 2.0 - Release Notes" -> "${anchor5}"`)
    } catch (error) {
      results.push(`❌ Numbers and hyphens failed: ${error}`)
    }

    setTestResults(results)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Functionality Test Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={runTests} className="w-full">
              Run Tests
            </Button>
            
            {testResults.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Test Results:</h3>
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono bg-gray-100 p-2 rounded">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 