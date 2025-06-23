import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // ✅ use expo-router navigation

const { width } = Dimensions.get('window');

// Dummy user data (replace with actual store or props)
const user = { name: 'Student', id: 1 }; // Replace this later with Redux/store/etc.
const userCourses: any[] = []; // Replace with real data
const isLoading = false;

export default function HomeScreen() {
  const router = useRouter();

  const renderCourseCard = (course: any) => (
    <TouchableOpacity
      key={course.id}
      style={styles.courseCard}
      onPress={() => router.push(`/course-detail/${course.id}`)}
    >
      <Image
        source={{ uri: course.thumbnail || 'https://via.placeholder.com/300x200' }}
        style={styles.courseImage}
      />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle} numberOfLines={2}>
          {course.title}
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${course.overallProgress || 0}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(course.overallProgress || 0)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderQuickAction = (icon: string, title: string, onPress: () => void) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={styles.quickActionIcon}>
        <Ionicons name={icon as any} size={24} color="#8b5cf6" />
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user && user.name || 'Student'}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#8b5cf6" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userCourses.length}</Text>
            <Text style={styles.statLabel}>Enrolled Courses</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {userCourses.filter(c => c.overallProgress >= 90).length}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            {renderQuickAction('book', 'Browse Courses', () =>
              router.push('/courses')
            )}
            {renderQuickAction('download', 'Downloads', () => {})}
            {renderQuickAction('trophy', 'Achievements', () => {})}
            {renderQuickAction('help-circle', 'Help & Support', () => {})}
          </View>
        </View>

        {/* Continue Learning */}
        {userCourses.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Continue Learning</Text>
              <TouchableOpacity onPress={() => router.push('/courses')}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.coursesScrollContainer}
            >
              {userCourses.map(renderCourseCard)}
            </ScrollView>
          </View>
        )}

        {/* Empty State */}
        {userCourses.length === 0 && !isLoading && (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={80} color="#d1d5db" />
            <Text style={styles.emptyStateTitle}>No Courses Yet</Text>
            <Text style={styles.emptyStateText}>
              Start your learning journey by enrolling in a course
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.push('/courses')}
            >
              <Text style={styles.browseButtonText}>Browse Courses</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { paddingHorizontal: 20 },
  header: {
    marginTop: 20, marginBottom: 20, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center'
  },
  greeting: { fontSize: 18, color: '#6b7280' },
  userName: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  profileButton: {},
  statsContainer: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 30
  },
  statCard: {
    alignItems: 'center', flex: 1,
    padding: 16, marginHorizontal: 5,
    backgroundColor: '#f3f4f6', borderRadius: 12
  },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: '#4f46e5' },
  statLabel: { fontSize: 14, color: '#6b7280' },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 15 },
  quickActionsContainer: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  quickAction: {
    width: width / 2 - 30,
    marginBottom: 20, alignItems: 'center'
  },
  quickActionIcon: {
    backgroundColor: '#ede9fe', padding: 12,
    borderRadius: 12, marginBottom: 6
  },
  quickActionText: { color: '#4f46e5', fontWeight: '500' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  seeAllText: { color: '#4f46e5', fontWeight: '500' },
  coursesScrollContainer: { flexDirection: 'row' },
  courseCard: {
    width: 220, marginRight: 16, borderRadius: 12,
    backgroundColor: '#f9fafb', overflow: 'hidden'
  },
  courseImage: { width: '100%', height: 120 },
  courseInfo: { padding: 10 },
  courseTitle: { fontWeight: 'bold', marginBottom: 4 },
  progressContainer: { flexDirection: 'row', alignItems: 'center' },
  progressBar: {
    flex: 1, height: 6, backgroundColor: '#e5e7eb',
    borderRadius: 3, marginRight: 8
  },
  progressFill: {
    height: 6, backgroundColor: '#4f46e5',
    borderRadius: 3
  },
  progressText: { fontSize: 12, color: '#6b7280' },
  emptyState: { alignItems: 'center', marginTop: 40, paddingHorizontal: 20 },
  emptyStateTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  emptyStateText: { fontSize: 14, color: '#6b7280', textAlign: 'center', marginVertical: 10 },
  browseButton: {
    backgroundColor: '#8b5cf6', paddingHorizontal: 24,
    paddingVertical: 10, borderRadius: 8
  },
  browseButtonText: { color: '#fff', fontWeight: 'bold' }
});
