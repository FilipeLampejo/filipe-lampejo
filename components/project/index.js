import styles from "./styles.module.scss";
import typography from "../../styles/typography.module.scss";
import grid from "../..//styles/grid.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";

import { useSpring, animated as a } from "react-spring";
import Image from "next/image";

import Year from "../date";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState, useEffect, useRef } from "react";
import useTranslation from "next-translate/useTranslation";

const columns = {
	year: (project) => project.date,
	category: (project) => project.categories,
	client: (project) => project.client,
	project: (project) => project.title,
	agency: (project) => project.agency,
};

function ProjectListItem({ project, open, onClick }) {
	let { t } = useTranslation();
	let details = useRef();
	const [height, setHeight] = useState(0);
	const props = useSpring({ height: height });

	let router = useRouter();
	const dt = (obj) => {
		if (!obj) return false;
		return obj[router.locale] || obj[router.defaultLocale];
	};

	useEffect(() => {
		if (details.current) {
			const initialPos = details.current.getBoundingClientRect().height;
			details.current.style.height = open ? "auto" : 0;
			const finalPos = details.current.getBoundingClientRect().height;
			details.current.style.height = initialPos;
			setHeight(finalPos);
			// console.log(initialPos, finalPos);
			// details.current.animate(
			// 	[
			// 		{ height: `${parseInt(initialPos)}px` },
			// 		{ height: `${parseInt(finalPos)}px` },
			// 	],
			// 	{
			// 		duration: 600,
			// 		easing: "cubic-bezier(0.16, 1, 0.3, 1)",
			// 	}
			// );
		}
	}, [open]);

	const displayColumns = {
		year: (text) => <Year dateString={text} />,
		category: (categories) => (
			<ul className={`${styles.categories} ${typography.smcp}`}>
				{categories.map((cat) => (
					<li key={cat.sys.id}>{dt(cat.fields.title)}</li>
				))}
			</ul>
		),
		client: (text) => text || "—",
		project: (text) => text || "—",
		agency: (text) => text || "—",
	};

	let thumbProps;
	if (project.cover) {
		const fileInfo = dt(dt(project.cover).fields.file);
		thumbProps = {
			src: fileInfo.url,
			ratio: fileInfo.details.image.width / fileInfo.details.image.height,
		};
	}

	return (
		<li
			className={`${grid.col} ${styles.listItem} ${styles.listProject} ${
				open ? styles.open : ""
			}`}
		>
			<header
				onClick={() => onClick(dt(project.slug))}
				className={`${styles.columns} ${grid.inner}`}
			>
				{Object.entries(columns).map(([key, value]) => (
					<div className={styles.column} data-col={key} key={key}>
						<dt className="visually-hidden">{t(`project:${key}`)}</dt>
						<dd>{displayColumns[key](dt(value(project)))}</dd>
					</div>
				))}
				<div className={styles.column} data-col="more" key="more">
					+
				</div>
			</header>
			<a.div
				ref={details}
				className={`${styles.details} ${grid.inner}`}
				style={props}
			>
				<div className={styles.image}>
					<Image
						width={1200}
						height={1200 / thumbProps.ratio}
						layout="responsive"
						src={`https:${thumbProps.src}`}
					/>
				</div>
				<div className={styles.info}>
					{documentToReactComponents(dt(project.sobre))}
					<Link href={`/projetos/${dt(project.slug)}`}>
						<a className={`${styles.view} ${typography.smcp}`}>
							{t("project:view")}
						</a>
					</Link>
				</div>
			</a.div>
		</li>
	);
}

export function ProjectList({ projects }) {
	let { t } = useTranslation();
	const [orderBy, setOrderBy] = useState("year");
	const [orderAsc, setOrderAsc] = useState(false);
	const [open, setOpen] = useState();
	const [projectList, setProjectList] = useState(projects);
	let router = useRouter();

	const dt = (obj) => {
		if (!obj) return false;
		return obj[router.locale] || obj[router.defaultLocale];
	};

	const toggleOpen = (slug) => {
		open === slug ? setOpen(null) : setOpen(slug);
	};

	const reorderTable = (col) => {
		if (col == orderBy) {
			setOrderAsc(!orderAsc);
		} else {
			setOrderAsc(true);
			setOrderBy(col);
		}
	};

	return (
		<ul className={`${styles.list}`}>
			<li
				key="header"
				className={`${styles.listItem} ${styles.listHeader} ${grid.col}`}
			>
				<div className={`${styles.columns} ${grid.inner}`}>
					{Object.keys(columns).map((col) => (
						<div
							data-col={col}
							className={styles.column}
							onClick={() => reorderTable(col)}
							className={`${typography.smcp} ${styles.column}`}
						>
							{t(`project:${col}`)}{" "}
							{orderBy == col ? (orderAsc ? "↓" : "↑") : ""}
						</div>
					))}
					<div className={styles.column} data-col="more" key="more"></div>
				</div>
			</li>
			{projectList
				.sort((a, b) => {
					if (columns[orderBy]) {
						return dt(columns[orderBy](a)) > dt(columns[orderBy](b))
							? orderAsc
								? 1
								: -1
							: orderAsc
							? -1
							: 1;
					}
					return 0;
				})
				.map((project) => (
					<ProjectListItem
						key={project.slug[0]}
						project={project}
						open={open == dt(project.slug)}
						onClick={toggleOpen}
					/>
				))}
		</ul>
	);
}

export default function ProjectThumb({ project, onHover }) {
	let thumbProps;

	let router = useRouter();
	const dt = (obj) => {
		if (!obj) return false;
		return obj[router.locale] || obj[router.defaultLocale];
	};

	if (project.cover) {
		const fileInfo = dt(dt(project.cover).fields.file);
		thumbProps = {
			src: fileInfo.url,
			ratio: fileInfo.details.image.width / fileInfo.details.image.height,
		};
	}

	return (
		<Link href={`/projetos/${dt(project.slug)}`}>
			<a
				className={styles.project}
				onMouseEnter={() => onHover(true)}
				onMouseLeave={() => onHover(false)}
			>
				<div className={`${styles.info}`}>
					<h2 className={`${styles.title} ${typography.headingOne}`}>
						<span>{documentToReactComponents(dt(project.displayTitle))}</span>
					</h2>
					<ul className={`${styles.categories} ${typography.smcp}`}>
						{dt(project.categories).map((cat) => (
							<li key={cat.sys.id}>{dt(cat.fields.title)}</li>
						))}
					</ul>
				</div>

				{thumbProps && (
					<div className={styles.thumb}>
						<Image
							width={1200}
							height={1200 / thumbProps.ratio}
							layout="responsive"
							src={`https:${thumbProps.src}`}
						/>
					</div>
				)}
			</a>
		</Link>
	);
}
