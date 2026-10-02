import { Request, Response } from "express";
import {
  getMessages,
  createMessage,
  markMessageAsRead,
  deleteMessage,
} from "../services/message.service";

export const getMessagesController = async (
  _req: Request,
  res: Response
) => {
  try {
    const messages = await getMessages();

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

export const createMessageController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const newMessage = await createMessage({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Create message error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

export const markMessageAsReadController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const updatedMessage = await markMessageAsRead(String(id));

    return res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Mark message as read error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update message",
    });
  }
};

export const deleteMessageController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await deleteMessage(String(id));

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Delete message error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};