import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const config = await request.json();
    const envPath = path.join(process.cwd(), '.env.local');
    
    let envContent = '';
    for (const [key, value] of Object.entries(config)) {
      envContent += `NEXT_PUBLIC_${key}=${value}\n`;
    }

    await fs.writeFile(envPath, envContent);

    return NextResponse.json({ message: 'Configuration updated successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error updating configuration', details: error.message },
      { status: 500 }
    );
  }
} 