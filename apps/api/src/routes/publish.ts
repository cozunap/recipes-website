import { Hono } from 'hono';
import { PublishService } from '../services/PublishService';

const publish = new Hono();

// POST /api/v1/publish/:pageId
publish.post('/:pageId', async (c) => {
  const pageId = c.req.param('pageId');
  const userId = 'system'; // Get from JWT Auth Middleware
  
  try {
    const success = await PublishService.publishPage(pageId, userId);
    return c.json({ success, message: "Page published successfully" });
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500);
  }
});

// POST /api/v1/publish/:pageId/rollback
publish.post('/:pageId/rollback', async (c) => {
  const pageId = c.req.param('pageId');
  const { revisionId } = await c.req.json();
  
  try {
    const success = await PublishService.rollbackPage(pageId, revisionId);
    return c.json({ success, message: "Page rolled back successfully" });
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500);
  }
});

export default publish;
