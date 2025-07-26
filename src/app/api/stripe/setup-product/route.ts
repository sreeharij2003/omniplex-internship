import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_CONFIG } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    // Check if product already exists
    const products = await stripe.products.list({
      limit: 100,
    });

    let product = products.data.find(p => p.name === STRIPE_CONFIG.PRO_PLAN.name);

    // Create product if it doesn't exist
    if (!product) {
      product = await stripe.products.create({
        name: STRIPE_CONFIG.PRO_PLAN.name,
        description: STRIPE_CONFIG.PRO_PLAN.description,
        metadata: {
          type: 'pro_plan',
        },
      });
      console.log('Created product:', product.id);
    }

    // Check if price already exists for this product
    const prices = await stripe.prices.list({
      product: product.id,
      limit: 100,
    });

    let price = prices.data.find(p => 
      p.unit_amount === STRIPE_CONFIG.PRO_PLAN.price && 
      p.currency === STRIPE_CONFIG.PRO_PLAN.currency
    );

    // Create price if it doesn't exist
    if (!price) {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: STRIPE_CONFIG.PRO_PLAN.price,
        currency: STRIPE_CONFIG.PRO_PLAN.currency,
        metadata: {
          type: 'pro_plan_price',
        },
      });
      console.log('Created price:', price.id);
    }

    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
      },
      price: {
        id: price.id,
        amount: price.unit_amount,
        currency: price.currency,
      },
      message: 'Product and price setup completed',
    });

  } catch (error: any) {
    console.error('Error setting up product:', error);
    return NextResponse.json(
      { error: 'Failed to setup product', details: error.message },
      { status: 500 }
    );
  }
}
