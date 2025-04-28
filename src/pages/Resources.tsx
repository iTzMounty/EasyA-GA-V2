import React from 'react';
import { ArrowLeft, FileCode, BookOpen, Rocket, Blocks, Code, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const resourceCategories = [
    {
      title: "Previous Hackathon Challenges",
      description: "Real challenges from past EasyA hackathons",
      icon: Rocket,
      resources: [
        {
          name: "DeFi Lending Protocol Challenge",
          description: "Build a decentralized lending protocol with dynamic interest rates",
          format: "Solidity",
          size: "2.1 MB",
          url: "/challenges/defi-lending.zip"
        },
        {
          name: "Cross-Chain Bridge Implementation",
          description: "Create a bridge between Ethereum and other Layer 1 chains",
          format: "Rust",
          size: "1.8 MB",
          url: "/challenges/cross-chain.zip"
        },
        {
          name: "Zero-Knowledge Identity System",
          description: "Implement privacy-preserving identity verification",
          format: "Multiple",
          size: "3.2 MB",
          url: "/challenges/zk-identity.zip"
        }
      ]
    },
    {
      title: "DeFi Development Fundamentals",
      description: "Core concepts and starter kits for DeFi development",
      icon: Blocks,
      resources: [
        {
          name: "AMM Implementation Guide",
          description: "Step-by-step guide to building an Automated Market Maker",
          format: "Tutorial",
          size: "4.5 MB",
          url: "/defi/amm-guide.zip"
        },
        {
          name: "Smart Contract Security Patterns",
          description: "Common security patterns and best practices",
          format: "PDF",
          size: "2.3 MB",
          url: "/defi/security-patterns.pdf"
        },
        {
          name: "DeFi Testing Framework",
          description: "Complete testing suite for DeFi protocols",
          format: "TypeScript",
          size: "1.7 MB",
          url: "/defi/testing-framework.zip"
        }
      ]
    },
    {
      title: "Blockchain Development Programs",
      description: "Comprehensive learning paths for different chains",
      icon: Code,
      resources: [
        {
          name: "Polkadot Substrate Starter",
          description: "Build your first parachain with Substrate",
          format: "Course",
          size: "5.2 MB",
          url: "/courses/polkadot-starter.zip"
        },
        {
          name: "Layer 2 Scaling Solutions",
          description: "Implementation guide for rollups and state channels",
          format: "Workshop",
          size: "3.8 MB",
          url: "/courses/l2-scaling.zip"
        },
        {
          name: "Zero-Knowledge Proof Development",
          description: "Practical guide to implementing ZK-proofs",
          format: "Tutorial",
          size: "4.1 MB",
          url: "/courses/zk-development.zip"
        }
      ]
    },
    {
      title: "Advanced Research Materials",
      description: "Cutting-edge blockchain research and implementations",
      icon: GraduationCap,
      resources: [
        {
          name: "MEV Protection Strategies",
          description: "Research on MEV protection and implementation guides",
          format: "PDF",
          size: "2.8 MB",
          url: "/research/mev-protection.pdf"
        },
        {
          name: "Consensus Mechanisms Deep Dive",
          description: "Comparative analysis of consensus protocols",
          format: "Paper",
          size: "1.9 MB",
          url: "/research/consensus-analysis.pdf"
        },
        {
          name: "Token Economics Framework",
          description: "Mathematical models for token economics",
          format: "Research",
          size: "3.4 MB",
          url: "/research/token-economics.pdf"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Developer Resources</h1>
        <p className="text-xl text-gray-600 mb-12">Access technical materials, challenges, and learning resources for blockchain development.</p>

        <div className="grid grid-cols-1 gap-12">
          {resourceCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <category.icon className="w-8 h-8 text-[#4D61FC] mr-4" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{category.title}</h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {category.resources.map((resource, resourceIndex) => (
                  <div 
                    key={resourceIndex}
                    className="border border-gray-100 rounded-xl p-6 hover:border-[#4D61FC] transition-all hover:shadow-md"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{resource.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded">{resource.format}</span>
                          <span>{resource.size}</span>
                        </div>
                      </div>
                      <button 
                        className="flex items-center justify-center bg-[#4D61FC] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#3D4FE7] transition-colors ml-4"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;