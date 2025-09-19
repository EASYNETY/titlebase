"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Phone, Video, MoreHorizontal, Clock } from "lucide-react"

interface ChatSession {
  id: string
  userId: string
  userName: string
  userEmail: string
  status: "active" | "waiting" | "ended"
  startTime: string
  lastMessage: string
  unreadCount: number
  priority: "low" | "medium" | "high"
}

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: "user" | "agent"
}

const mockChatSessions: ChatSession[] = [
  {
    id: "chat-001",
    userId: "user-123",
    userName: "John Smith",
    userEmail: "john.smith@email.com",
    status: "active",
    startTime: "2024-01-20 14:30",
    lastMessage: "I need help with my investment",
    unreadCount: 2,
    priority: "high",
  },
  {
    id: "chat-002",
    userId: "user-456",
    userName: "Sarah Johnson",
    userEmail: "sarah.j@email.com",
    status: "waiting",
    startTime: "2024-01-20 14:45",
    lastMessage: "Hello, is anyone there?",
    unreadCount: 1,
    priority: "medium",
  },
  {
    id: "chat-003",
    userId: "user-789",
    userName: "Mike Chen",
    userEmail: "mike.chen@email.com",
    status: "active",
    startTime: "2024-01-20 13:15",
    lastMessage: "Thank you for your help!",
    unreadCount: 0,
    priority: "low",
  },
]

const mockMessages: Message[] = [
  {
    id: "msg-1",
    senderId: "user-123",
    senderName: "John Smith",
    content: "Hi, I need help with my investment portfolio",
    timestamp: "14:30",
    type: "user",
  },
  {
    id: "msg-2",
    senderId: "agent-1",
    senderName: "You",
    content: "Hello John! I'd be happy to help you with your portfolio. What specific questions do you have?",
    timestamp: "14:31",
    type: "agent",
  },
  {
    id: "msg-3",
    senderId: "user-123",
    senderName: "John Smith",
    content: "I'm not seeing my latest dividend payment. It should have been processed yesterday.",
    timestamp: "14:32",
    type: "user",
  },
  {
    id: "msg-4",
    senderId: "agent-1",
    senderName: "You",
    content: "Let me check that for you. Can you please provide your account email or wallet address?",
    timestamp: "14:33",
    type: "agent",
  },
]

export function LiveChat() {
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(mockChatSessions[0])
  const [newMessage, setNewMessage] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "waiting":
        return <Badge className="bg-yellow-100 text-yellow-800">Waiting</Badge>
      case "ended":
        return <Badge className="bg-gray-100 text-gray-800">Ended</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Chat Sessions List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Active Chats ({mockChatSessions.filter((c) => c.status === "active").length})
          </CardTitle>
          <CardDescription>Manage live customer conversations</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {mockChatSessions.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedChat?.id === chat.id ? "bg-blue-50 border-blue-200" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/abstract-geometric-shapes.png?height=32&width=32&query=${chat.userName}`} />
                        <AvatarFallback>{chat.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{chat.userName}</p>
                        <p className="text-xs text-muted-foreground">{chat.userEmail}</p>
                      </div>
                    </div>
                    {chat.unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs">{chat.unreadCount}</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(chat.status)}
                    {getPriorityBadge(chat.priority)}
                  </div>

                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>

                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {chat.startTime}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="lg:col-span-2">
        {selectedChat ? (
          <>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/abstract-geometric-shapes.png?height=40&width=40&query=${selectedChat.userName}`} />
                    <AvatarFallback>{selectedChat.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedChat.userName}</CardTitle>
                    <CardDescription>{selectedChat.userEmail}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedChat.status)}
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Messages */}
              <ScrollArea className="h-[400px] mb-4">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "agent" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.type === "agent" ? "bg-blue-600 text-white" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.type === "agent" ? "text-blue-100" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-[500px]">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select a chat to start messaging</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
