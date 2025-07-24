"use client"

import { Badge } from "@/components/ui/badge"

export default function DocumentationPDF() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
      {/* Document Header */}
      <div className="px-12 py-8 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <img src="/images/ondo-logo.png" alt="ONDO Logo" className="h-12" />
          <div className="text-right text-sm text-gray-600">
            <p>Development Documentation</p>
            <p>Version 1.0 • {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ONDO POS Service</h1>
          <p className="text-xl text-gray-600 mb-6">Spring Boot-based Point of Sale Service</p>
          <div className="flex justify-center space-x-2">
            <Badge variant="secondary">Java 21</Badge>
            <Badge variant="secondary">Spring Boot 3.2.2</Badge>
            <Badge variant="secondary">REST API</Badge>
            <Badge variant="secondary">JNA Integration</Badge>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="px-12 py-8 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>1. Overview</span>
              <span>3</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>2. Features</span>
              <span>3</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>3. Technology Stack</span>
              <span>4</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>4. Prerequisites</span>
              <span>4</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>5. Installation</span>
              <span>5</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>6. API Endpoints</span>
              <span>6</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>7. Payment Types</span>
              <span>8</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>8. Configuration</span>
              <span>9</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>9. Development</span>
              <span>10</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>10. Project Structure</span>
              <span>12</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>11. Error Handling & Logging</span>
              <span>13</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>12. Security Considerations</span>
              <span>14</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>13. Troubleshooting</span>
              <span>14</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>14. Windows Service Installation</span>
              <span>15</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>15. Contributing & License</span>
              <span>18</span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="px-12 py-8 space-y-8">
        {/* Overview Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">1. Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A Spring Boot-based Point of Sale (POS) service that integrates with external payment terminals through
            native library integration. This service provides RESTful APIs for processing payments, refunds, and
            terminal management operations.
          </p>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">2. Features</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Payment Processing</h4>
                  <p className="text-sm text-gray-600">
                    Support for multiple payment types including card, cash, social mobile, QR codes, UPI, and merchant
                    wallets
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Refund Operations</h4>
                  <p className="text-sm text-gray-600">Process refunds using transaction reference numbers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Terminal Management</h4>
                  <p className="text-sm text-gray-600">Logon, version checking, and settlement operations</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Native Integration</h4>
                  <p className="text-sm text-gray-600">
                    JNA-based integration with ez-connector.dll for terminal communication
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">RESTful API</h4>
                  <p className="text-sm text-gray-600">Clean REST endpoints for all POS operations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Cross-Origin Support</h4>
                  <p className="text-sm text-gray-600">CORS enabled for web client integration</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">3. Technology Stack</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Core Technologies</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Java 21</li>
                <li>• Spring Boot 3.2.2</li>
                <li>• Spring Web</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Integration & Processing</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• JNA (Java Native Access)</li>
                <li>• Jackson (JSON processing)</li>
                <li>• Log4j (Logging)</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Testing</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• JUnit 5</li>
                <li>• Mockito</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prerequisites */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">4. Prerequisites</h2>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Java 21 or higher</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Maven 3.6+</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm">ez-connector.dll</code> native library (must
                  be in the classpath)
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>
                  GOLOMT API:{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm">https://lambdamn.github.io/apis/</code>
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Installation */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">5. Installation</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Clone the repository:</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>git clone &lt;repository-url&gt;</div>
                <div>cd pos-service</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Ensure native library is available:</h4>
              <p className="text-gray-600 text-sm mb-2">
                Place <code className="bg-gray-200 px-2 py-1 rounded">ez-connector.dll</code> in the{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">src/main/resources/</code> directory
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Build the project:</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">mvn clean compile</div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4. Run the application:</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">mvn spring-boot:run</div>
              <p className="text-gray-600 text-sm mt-2">
                The application will start on{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">http://localhost:8080</code>
              </p>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">6. API Endpoints</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Processing</h3>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">POST</Badge>
                    <code className="text-sm">/processPayment</code>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Request Body:</h5>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                      {`{
  "amount": 100.50,
  "skipPrint": false,
  "paymentType": 1,
  "defaultQrPayment": 4,
  "extra": "Additional payment info"
}`}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Response:</h5>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                      {`{
  "succeed": true,
  "message": "Payment successful",
  "amount": 100.50,
  "payment": "Card",
  "systemRef": "12345",
  "traceno": "67890",
  "approveCode": "ABC123",
  "maskedPAN": "************1234",
  "transactionAt": "2024-01-15T10:30:00",
  "merchantId": "M12345",
  "terminalId": "T67890"
}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Refund Processing</h3>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">POST</Badge>
                    <code className="text-sm">/refund</code>
                  </div>
                </div>

                <div className="p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Request Body:</h5>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                    {`{
  "traceno": "67890",
  "skipPrint": false
}`}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Terminal Management</h3>

              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-100 text-blue-800">GET</Badge>
                      <code className="text-sm">/checkVersion</code>
                      <span className="text-sm text-gray-600">- Check Terminal Version</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">POST</Badge>
                      <code className="text-sm">/logon</code>
                      <span className="text-sm text-gray-600">- Terminal Logon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Types */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">7. Payment Types</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">The service supports the following payment types:</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <code className="bg-white px-2 py-1 rounded text-sm font-mono">0</code>
                  <span className="text-gray-700">None</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-white px-2 py-1 rounded text-sm font-mono">1</code>
                  <span className="text-gray-700">Card</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-white px-2 py-1 rounded text-sm font-mono">2</code>
                  <span className="text-gray-700">Cash</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-white px-2 py-1 rounded text-sm font-mono">3</code>
                  <span className="text-gray-700">Social Mobile</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <code className="bg-white px-2 py-1 rounded text-sm font-mono">4</code>
                  <span className="text-gray-700">Social QR Code</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-white px-2 py-1 rounded text-sm font-mono">5</code>
                  <span className="text-gray-700">UPI QR Code</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-white px-2 py-1 rounded text-sm font-mono">6</code>
                  <span className="text-gray-700">Merchant Wallet</span>
                </div>
                <div className="flex items-center space-x-3">
                  <code className="bg-white px-2 py-1 rounded text-sm font-mono">7</code>
                  <span className="text-gray-700">Monpay</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">8. Configuration</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Application Properties</h3>
              <p className="text-gray-700 mb-3">
                The application uses standard Spring Boot configuration. Key properties can be configured in{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">application.properties</code>:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                {`# Server configuration
server.port=8080

# Logging configuration
logging.level.com.ondo.pos=INFO`}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Native Library</h3>
              <p className="text-gray-700 mb-3">
                The service integrates with the <code className="bg-gray-200 px-2 py-1 rounded">ez-connector.dll</code>{" "}
                native library which provides the following functions:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm">logon()</code> - Terminal logon
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm">payment()</code> - Process payment
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm">refund()</code> - Process refund
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm">settlement()</code> - Terminal settlement
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm">version()</code> - Get terminal version
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm">getIdCard()</code> - Get ID card
                      information
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Development */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">9. Development</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Makefile Commands</h3>
              <p className="text-gray-700 mb-4">
                This project includes a comprehensive Makefile for easy development workflows. Run{" "}
                <code className="bg-gray-200 px-2 py-1 rounded">make help</code> to see all available commands.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Building Commands</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1">
                    <div># Build the project (compile + package)</div>
                    <div>make build</div>
                    <div className="mt-2"># Build without running tests (faster)</div>
                    <div>make build-skip-tests</div>
                    <div className="mt-2"># Compile only</div>
                    <div>make compile</div>
                    <div className="mt-2"># Quick build workflow</div>
                    <div>make quick-build</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Testing Commands</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1">
                    <div># Run all tests</div>
                    <div>make test</div>
                    <div className="mt-2"># Run tests with verbose output</div>
                    <div>make test-verbose</div>
                    <div className="mt-2"># Run a single test class</div>
                    <div>make test-single CLASS=PosControllerTests</div>
                    <div className="mt-2"># Run tests with coverage report</div>
                    <div>make test-coverage</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Running Commands</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1">
                    <div># Run the application using Maven</div>
                    <div>make run</div>
                    <div className="mt-2"># Run the application using JAR file</div>
                    <div>make run-jar</div>
                    <div className="mt-2"># Run in debug mode (port 5005)</div>
                    <div>make run-debug</div>
                    <div className="mt-2"># Run with specific profile</div>
                    <div>make run-profile PROFILE=dev</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Utility Commands</h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1">
                    <div># Clean the project</div>
                    <div>make clean</div>
                    <div className="mt-2"># Show project dependencies</div>
                    <div>make deps</div>
                    <div className="mt-2"># Generate documentation</div>
                    <div>make docs</div>
                    <div className="mt-2"># Check project environment</div>
                    <div>make check</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Running Tests</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">mvn test</div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Building JAR</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">mvn clean package</div>
                <p className="text-gray-600 text-sm mt-2">
                  The executable JAR will be created as{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">target/ondo-pos-application.jar</code>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Running JAR</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                  java -jar target/ondo-pos-application.jar
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Structure */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">
            10. Project Structure
          </h2>
          <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            {`src/
├── main/
│   ├── java/com/ondo/pos/
│   │   ├── controller/
│   │   │   └── PosController.java      # REST API endpoints
│   │   ├── model/
│   │   │   ├── PaymentRequest.java     # Payment request model
│   │   │   ├── PaymentResponse.java    # Payment response model
│   │   │   └── RefundRequest.java      # Refund request model
│   │   └── PosApplication.java         # Spring Boot main class
│   └── resources/
│       ├── application.properties      # Application configuration
│       ├── ez-connector.dll           # Native library
│       └── log4j.properties           # Logging configuration
└── test/
    └── java/com/ondo/pos/
        ├── PosApplicationTests.java    # Application context tests
        └── PosControllerTests.java     # Controller unit tests`}
          </div>
        </section>

        {/* Error Handling & Logging */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">
            11. Error Handling & Logging
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Error Handling</h3>
              <p className="text-gray-700 mb-3">The service includes comprehensive error handling:</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>JSON processing errors are caught and logged</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Native library errors are handled gracefully</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Invalid requests return appropriate error responses</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Logging</h3>
              <p className="text-gray-700 mb-3">The application uses Log4j for logging with the following features:</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>Request/response logging</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>Error logging with stack traces</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>Terminal operation logging</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>Configurable log levels</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Considerations */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">
            12. Security Considerations
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>
                  CORS is enabled for all origins (
                  <code className="bg-gray-200 px-2 py-1 rounded">@CrossOrigin(&quot;*&quot;)</code>)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Input validation should be implemented for production use</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Consider implementing authentication and authorization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Secure the native library file appropriately</span>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">13. Troubleshooting</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Issues</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Native library not found</h4>
                  <p className="text-gray-600 text-sm">
                    Ensure <code className="bg-gray-200 px-2 py-1 rounded">ez-connector.dll</code> is in the correct
                    location
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Payment processing fails</h4>
                  <p className="text-gray-600 text-sm">Check terminal connectivity and configuration</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">3. JSON parsing errors</h4>
                  <p className="text-gray-600 text-sm">Verify request format matches expected schema</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Debug Mode</h3>
              <p className="text-gray-700 mb-2">Enable debug logging by setting:</p>
              <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
                logging.level.com.ondo.pos=DEBUG
              </div>
            </div>
          </div>
        </section>

        {/* Windows Service Installation */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">
            14. Windows Service Installation (WinSW)
          </h2>

          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-gray-700">
                This application can be installed as a Windows Service using WinSW (Windows Service Wrapper). WinSW
                allows Java applications to run as native Windows services with automatic startup, restart capabilities,
                and system integration.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">WinSW Download and Setup</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">1. Download WinSW</h4>
                  <p className="text-gray-700 mb-2">
                    Download the latest WinSW release from the official GitHub repository:
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>URL:</strong> https://github.com/winsw/winsw/releases
                      </div>
                      <div>
                        <strong>Recommended Version:</strong> WinSW v3.0.0 or later
                      </div>
                      <div>
                        <strong>Download File:</strong>{" "}
                        <code className="bg-gray-200 px-2 py-1 rounded">WinSW-x64.exe</code> (for 64-bit systems)
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">2. Installation Steps</h4>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <h5 className="font-medium text-gray-900 mb-2">Download WinSW Executable:</h5>
                      <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-sm">
                        # Download WinSW-x64.exe from the releases page
                        <br /># Place it in your application directory alongside the JAR and .xml file
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3">
                      <h5 className="font-medium text-gray-900 mb-2">Rename WinSW Executable:</h5>
                      <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-sm">
                        # Rename WinSW-x64.exe to match your service name xml
                        <br /># Example: ondo-pos-service.exe
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3">
                      <h5 className="font-medium text-gray-900 mb-2">Install the Service:</h5>
                      <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-sm">
                        # Run as Administrator
                        <br />
                        WinSW.NET4.exe install docs/WinSW.NET4.xml
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3">
                      <h5 className="font-medium text-gray-900 mb-2">Start the Service:</h5>
                      <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-sm">
                        # Start the service
                        <br />
                        net start ondo-pos-service
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">WinSW Configuration</h3>
              <p className="text-gray-700 mb-3">
                The provided <code className="bg-gray-200 px-2 py-1 rounded">WinSW.NET4.xml</code> configuration
                includes:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                {`<service>
  <id>ondo-pos-service</id>
  <name>ONDO Pos Application</name>
  <description>Энэхүү сервис нь ОНДО ХХК-ийн санхүүгийн бөгөөд Голомт банкны EZ POS төхөөрөмжтөй холбогдож ажиллана.</description>
  <executable>java</executable>
  <arguments>-jar ondo-pos-application.jar</arguments>
</service>`}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Troubleshooting WinSW</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900 mb-2">Service won&apos;t start:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Check that Java is installed and in PATH</li>
                    <li>• Verify the JAR file path is correct</li>
                    <li>• Check Windows Event Viewer for error messages</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900 mb-2">Permission denied:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Run WinSW commands as Administrator</li>
                    <li>• Ensure the application directory has proper permissions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contributing & License */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-pink-500 pb-2">
            15. Contributing & License
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Contributing</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span>Fork the repository</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span>Create a feature branch</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span>Make your changes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <span>Add tests for new functionality</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <span>Ensure all tests pass</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    6
                  </div>
                  <span>Submit a pull request</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">License</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700">
                  This project is proprietary software owned by <strong>ONDO</strong>.
                </p>
                <p className="text-sm text-gray-600 mt-2">Developed by Tumee</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Support</h3>
              <p className="text-gray-700">
                For support and questions, please contact the development team or create an issue in the project
                repository.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="px-12 py-6 bg-gray-50 border-t border-gray-200 mt-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/images/ondo-logo.png" alt="ONDO Logo" className="h-6" />
            <div className="text-sm text-gray-600">
              <p>© 2024 ONDO. All rights reserved.</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>Development Documentation</p>
            <p>Version 1.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
