import Link from 'next/link';
import { BlogPostMetadata } from '../data';
import { Card, Text, Badge, Group, Stack, Anchor, CardSection } from '@mantine/core';
import { Image } from 'app/components/ui/image';

interface PostCardProps {
  post: BlogPostMetadata;
  showTags?: boolean;
  maxTags?: number;
  cardHeight?: string;
}

export default function PostCard({
  post,
  showTags = true,
  maxTags = 2,
  cardHeight = '100%',
}: PostCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder h={cardHeight}>
      <CardSection p={'8px'}>
        {post.thumbnail && (
          <Image
            src={post.thumbnail}
            alt={post.title}
            // width={400}
            height={200}
            radius="12px"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'contain',
            }}
          />
        )}
      </CardSection>

      <Stack gap="md" mt="xs">
        <Text fw={600} size="lg" lineClamp={2}>
          <Anchor component={Link} href={`/blog/${post.slug}`} c="blue" underline="hover">
            {post.title}
          </Anchor>
        </Text>

        {/* <Text c="dimmed" size="sm" lineClamp={3}>
          {post.description}
        </Text> */}

        {showTags && post.tags && (
          <Group gap="xs">
            {post.tags.slice(0, maxTags).map((tag: string) => (
              <Badge key={tag} variant="light" color="blue" size="xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > maxTags && (
              <Badge variant="light" color="gray" size="xs">
                +{post.tags.length - maxTags} more
              </Badge>
            )}
          </Group>
        )}

        <Group justify="space-between" mt="auto">
          <Text size="xs" c="dimmed">
            By {post.author}
          </Text>
          <Text size="xs" c="dimmed" component="time" dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}

// Compact version for smaller layouts
export function CompactPostCard({ post }: { post: BlogPostMetadata }) {
  return (
    <Card
      shadow="sm"
      padding="md"
      radius="lg"
      withBorder
      className="cursor-pointer transition-all duration-200 hover:shadow-md"
      component={Link}
      href={`/blog/${post.slug}`}
      style={{
        textDecoration: 'none',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Group gap="md" align="flex-start" wrap="nowrap">
        {/* <Image
          src={post.thumbnail}
          alt={post.title}
          width={100}
          height={75}
          radius="8px"
          style={{
            flexShrink: 0,
            objectFit: 'cover',
          }}
        /> */}

        <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
          <Text fw={600} size="sm" lineClamp={2} c="text">
            {post.title}
          </Text>

          <Text c="subtext1" size="xs" lineClamp={2}>
            {post.description}
          </Text>

          <Group gap="xs" wrap="nowrap">
            {post.tags?.slice(0, 2).map((tag: string) => (
              <Badge key={tag} variant="light" color="lavender" size="xs">
                {tag}
              </Badge>
            ))}
          </Group>

          <Group justify="space-between" gap="xs" wrap="nowrap">
            <Text size="xs" c="subtext0" fw={500}>
              {post.author}
            </Text>
            <Text size="xs" c="subtext0">
              {new Date(post.date).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
}
