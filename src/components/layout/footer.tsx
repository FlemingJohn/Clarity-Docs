'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FileText } from 'lucide-react';
import logo from '@/images/logo.png';

const Footer = () => {
  return (
    <footer className="border-t bg-card/50">
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="ClarityDocs"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-semibold text-foreground">ClarityDocs</span>
          </div>
          
          {/* Made by */}
          <div className="text-center text-sm text-muted-foreground">
            Made with ❤️ by{' '}
            <Link 
              href="https://github.com/joe-anidas" 
              className="hover:text-foreground transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dev.Copilot
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © 2025 ClarityDocs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;