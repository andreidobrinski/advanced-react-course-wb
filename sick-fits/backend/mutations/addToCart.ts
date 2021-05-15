import { KeystoneContext } from "@keystone-next/types";
import { Session } from '../types';
import { CartItemCreateInput } from '../.keystone/schema-types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // query the current user and see if they're signed in
  const sesh = context.session as Session;

  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this');
  }

  // query the current user's cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: {
      user: { id: sesh.itemId },
      product: { id: productId }
    },
    resolveField: 'id,quantity'
  });
  const [existingCartItem] = allCartItems;

  // see if the current item is in their cart
  if (existingCartItem) {
    // if it is, increment by one
    console.log(`There are already ${existingCartItem.quantity}, increment by 1`);

    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        quantity: existingCartItem.quantity + 1
      }
    })
  }

  // if it isn't create a new cart item
  return await context.lists.CartItem.createOne({
    data: {
      product: {
        connect: {
          if: productId
        }
      },
      user: {
        connect: {
          id: sesh.itemId
        }
      }
    }
  })
}

export default addToCart;